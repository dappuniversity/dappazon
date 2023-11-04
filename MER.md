
## Mapeamento dos Dados 
---

**Data in Sanity CMS**:

* **Product**:
   - Type
   - Id
   - Stock
   - Price
   - Category
   - Seller_Id
   - Description
   - Banner
   - ImageList (List of images)
   - CreationDate
   - UpdateDate
   - Status

* **Storefront**:
   - Seller_Id
   - Category
   - Id
   - ProductList (List of Product IDs)

* **Seller**:
    - Id
    - Logo
    - Banner
    - Name
    - Desc

---

**Data on the Blockchain**:

* **Seller**:
   - Id
   - Token_Id
   - List[Payment_Method_Id]

* **Payment_Method**:
    - Id
    - Name
    - Tax

* **Order**:
   - Id
   - List[Product_Ids]
   - Seller_Id
   - Buyer_Id

* **Dappazon.sol**:
   - Id
   - Product_Ids (Product IDs)
   - Seller_Id
   - Payment_Id
   - Token_Id (opcional)
   - Buyer_Id

* **Token**:
   - Type (ERC20 | NFT)
   - Id
   - Quantity
   - AnchorValue
   - Seller_Id

---
erDiagram

    Product ||--o{ Storefront : contains
    Seller ||--o{ Product : sells
    Seller ||--o{ Storefront : owns
    Seller ||--o{ Order : sells
    Seller ||--o{ Transaction : transacts
    Seller ||--o{ Token : owns
    Payment_Method ||--o{ Seller : usedBy
    Order ||--o{ Transaction : initiates
    Product ||--o{ Order : orderedIn
    Product ||--o{ Transaction : transactedIn
    Token ||--o{ Transaction : usedIn

    Product {
        string Type
        string Id
        int Stock
        float Price
        string Category
        string Seller_Id
        string Description
        string Banner
        List ImageList
        datetime CreationDate
        datetime UpdateDate
        string Status
    }

    Storefront {
        string Seller_Id
        string Category
        string Id
        List ProductList
    }

    Seller {
        string Id
        string Logo
        string Banner
        string Name
        string Desc
    }

    Seller {
        string Id
        string Token_Id
        List Payment_Method_Id
    }

    Payment_Method {
        string Id
        string Name
        float Tax
    }

    Order {
        string Id
        List Product_Ids
        string Seller_Id
        string Buyer_Id
    }

    Transaction {
        string Id
        string Product_Ids
        string Seller_Id
        string Payment_Id
        string Token_Id
        string Buyer_Id
    }

    Token {
        string Type
        string Id
        int Quantity
        float AnchorValue
        string Seller_Id
    }

---

- Cryptocurrency Exchange - Entidade onde o cliente irá trocar nossas moedas por REAL, REAL pelas moedas

* Fluxo 

  ETH
     XPERIENCE COIN
        XPERIENCE COIN - Seller Id

---