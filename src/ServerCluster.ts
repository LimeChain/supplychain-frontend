import fs from 'fs';
import os from 'os';
import cluster from 'cluster';

import Logger from './backend/utilities/Logger';

// const cluster = require('cluster');
// const os = require('os');

const Config = require('../config/config');

const SERVER_WORKER_NAME = 'SERVER_WORKER';

const NUM_CPUS = Config.Build.DEV === true ? 1 : os.cpus().length;

class ServerCluster {

    workers: Map < number, cluster.Worker >;
    exiting: boolean;

    constructor() {
        this.workers = new Map();
        this.exiting = false;
    }

    async start() {
        if (cluster.isMaster) {
            this.initMasterListeners();
            this.initErrorListeners();
            this.initFiles();

            for (let i = 0; i < NUM_CPUS; i++) {
                this.forkServerWorker();
            }

            cluster.on('exit', this.onWorkerExit.bind(this));

            if (Config.Build.DEV === true) {
                process.send('SERVER_MSG::STARTED');
            }
        } else {
            this.initErrorListeners();

            switch (process.env.PROCESS_NAME) {
                case SERVER_WORKER_NAME:
                    const ServerWorker = require('./ServerWorker'); /* it should be here to avoid creating of dummy objects (QueueDispatcher) */
                    new ServerWorker(Config.Server.BACKEND_PORT, Config.Server.SESSION_UNIQUE_KEY).start();
                    break;
                default:
            }
        }
    }

    // init
    initMasterListeners() {
        process.on('message', this.onClusterMessage.bind(this));
    }

    initErrorListeners() {
        if (Config.Build.DEV === true) {
            process.on('unhandledRejection', (reason, p) => {
                console.log(p);
                Logger.error('Promise error', reason);
                if (cluster.isMaster) {
                    process.exit(0);
                } else {
                    cluster.worker.kill();
                }
            });
        }
    }

    initFiles() {
        if (fs.existsSync(Config.Path.Root.DATA) === false) {
            console.error('Create root /data folder');
            return;
        }

        if (fs.existsSync(Config.Path.Root.LOGS) === false) {
            console.error('Create root /logs folder');
            return;
        }

        fs.mkdirSync(Config.Path.Root.Data.SESSIONS, { 'recursive': true });
    }

    // listeners
    onClusterMessage(data) {
        switch (data) {
            case 'SERVER_MSG::EXIT':
                if (Config.Build.DEV === true) {
                    this.exiting = true;
                    this.workers.forEach((worker, pid) => {
                        worker.process.kill();
                    });
                }
                break;
            default:
        }
    }

    onWorkerExit(worker, code, signal) {
        this.workers.delete(worker.process.pid);

        if (code === null) {
            Logger.log(`Worker ${worker.process.pid} restarted with code: ${code} and signal: ${signal} (${worker.process.env.PROCESS_NAME})`);
        } else {
            Logger.error(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal} (${worker.process.env.PROCESS_NAME})`);
        }

        if (worker.exitedAfterDisconnect !== true && Config.Build.PRODUCTION === true) {
            switch (worker.process.env.PROCESS_NAME) {
                case SERVER_WORKER_NAME:
                    this.forkServerWorker();
                    break;
                default:
            }
        }

        if (this.workers.size === 0) {
            process.exit(0);
        }
    }

    // utilities
    forkServerWorker() {
        const serverWorker = this.fork(new Env(SERVER_WORKER_NAME));
    }

    fork(env) {
        const worker = cluster.fork(env);
        worker.process.env = env;
        this.workers.set(worker.process.pid, worker);
        return worker;
    }

}

class Env {

    PROCESS_NAME: string;

    constructor(PROCESS_NAME) {
        this.PROCESS_NAME = PROCESS_NAME;
    }

}

new ServerCluster().start();
