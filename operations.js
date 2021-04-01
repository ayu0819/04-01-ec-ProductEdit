import { db, FirebaseTimestamp } from "../../firebase"
import {push} from 'connected-react-router'
import {deleteProductsAction,fetchProductsAction} from "./actions"
import { SetSizeArea } from "../../components/Products"

const productsRef = db.collection('products')

// -------------------------------------
// 商品情報のイテレート用関数 (where条件文)
// -------------------------------------
export const fetchProducts = (category) => {
  return async (dispatch) => {

    let query = productsRef.orderBy('updated_at', 'desc');
    query = category !== '' ? query.where('category', '==', category) : query;
    // query = search !== '' ? query.where('name', '==', search) : query;
    
    query.get()
      .then(snapshots => {
        const productList = [];
        snapshots.forEach(snapshot => {
          const product = snapshot.data();
          productList.push(product);
        })
        dispatch(fetchProductsAction(productList))
    })
  }
}

export const orderProduct = (productsInCart,amount) => {
  console.log(productsInCart)
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now;

    let products = {},
        soldOutProducts = [];

     const batch = db.batch()
     
     for (const product of productsInCart) {
       const snapshot = await productsRef.doc(product.productId).get()
       const sizes = snapshot.data().sizes;
       console.log(sizes)
       console.log(product)
       console.log(product.sizes)
       console.log(snapshot)

       const updatedSizes = sizes.map(size => {
         if(size.size === size.size) {
          console.log(product.size)
          console.log(size.size)
          console.log(size.quantity)
          alert('商品処理')
           // 売り切れだったら 無効
           if(size.quantity === 0) {
             alert('商品が有ません')
             soldOutProducts.push(product.name);
             return size
           }
           return{
             size: size.size,
             quantity: size.quantity -1
           }

         } else {
          // 今回選んだサイズでなければ
          console.log('何もしなてないよ')
          console.log(size.name)
          console.log(product)
          console.log(product.name)
          console.log(size)
           return size
         }

       })
     }
  }
}


export const saveProduct = (id,name,description,state,category,shippingArea,shippingFee,shippingMethod,shippingDay,images,price,sizes) => {
    return async (dispatch) => {
      const timestamp = FirebaseTimestamp.now()

      const data = {
        name: name,
        description: description,
        state: state,
        images: images,
        category: category,
        shippingArea: shippingArea,
        shippingFee: shippingFee,
        shippingMethod: shippingMethod,
        shippingDay: shippingDay,
        updated_at: timestamp,
        price: parseInt(price, 10),
        sizes: sizes
      }

  if (id === "") {
        const ref = productsRef.doc();
        id = ref.id
          data.id = id
          data.created_at = timestamp
  }

      return productsRef.doc(id).set(data, {merge: true})
      .then(()=>{
          dispatch(push('/'))
      }).catch((error) => {
          throw new Error(error)
      })
    }
}

// deleteMenu
export const deleteProduct =  (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
    .then(() => {
      const prevProducts = getState().products.list;
      const nextProducts = prevProducts.filter(product => product.id !== id)
      dispatch(deleteProductsAction(nextProducts))
    })
  }
}