
            
export default class ProductModelH {



    static P_PRODUCT_ID = 1;
    static P_PRODUCT_NAME = 2;
    static P_PRODUCT_UNIT = 3;
    static P_PRODUCT_DESCRIPTION = 4;
    static P_PRODUCT_DELETED = 5;
    static PROPERTIES = [ProductModelH.P_PRODUCT_ID,
        ProductModelH.P_PRODUCT_NAME,
        ProductModelH.P_PRODUCT_UNIT,
        ProductModelH.P_PRODUCT_DESCRIPTION,
        ProductModelH.P_PRODUCT_DELETED];

    productId: number;
    productName: string;
    productUnit: number;
    productDescription: string;
    productDeleted: number;

}
