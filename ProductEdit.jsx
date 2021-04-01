import React,{useCallback,useEffect,useState} from 'react';
import {TextInput,SelectBox,TextArea} from '../components/UIkit';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {saveProduct} from '../reducks/products/operations';
import {ImageArea,SetSizesArea} from '../components/Products';
import { db } from '../firebase';

const Item = styled.div`
    margin: 3em 0;
`;

const Button = styled.button`
    background-color: rgb(234, 53, 45);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    display: block;
    width: 70%;
    font-size: 14px;
    margin: 0 auto;
    padding: 15px 10px;
    transition: all ease-out .3s;

    :hover {
    background-color: rgb(129, 33, 28);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    display: block;
    width: 70%;
    font-size: 14px;
    margin: 0 auto;
    padding: 15px 10px;
    transition: all ease-out .3s;
    }
`;

const ProductEdit = () => {
    const dispatch = useDispatch();

    // ----------------------------------
    // DBデータ 出力 (URLからidを取得する)
    // ----------------------------------
    let id = window.location.pathname.split('/product/edit') [1];
    console.log("Before split /", id)
    
    if(id !== "") {
        id = id.split('/')[1]
        console.log("After split /",id);
    }

    const [description, setDescription] = useState(""),
          [name, setName] = useState(""),
          [categories, setCategories] = useState([]),
          [category, setCategory] = useState(""),
          [state, setState] = useState(""),
          [images, setImages] = useState([]),
          [shippingFee, setShippingFee] = useState(""),
          [shippingArea, setShippingArea] = useState(""),
          [shippingDay, setShippingDay] = useState(""),
          [price, setPrice] = useState(""),
          [sizes, setSizes] = useState([]),
          [shippingMethod, setShippingMethod] = useState("");

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    },[setDescription]);

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

     const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    },[setPrice]);

    const states =  [
        {id: "select1", name: '選択してください'},
        {id: "new", name: '新品・未使用'},
        {id: "littleNew", name: '未使用に近い'},
        {id: "noTrauma", name: '目立った外傷なし'},
        {id: "littleTrauma", name: 'やや汚れあり'},
        {id: "trauma", name: '傷・汚れあり'},
        {id: "bad", name: '全体的に状態が悪い'}
    ];

    const shippingFees =  [
        {id: "select2", name: '選択してください'},
        {id: "shipping", name: '送料込み(出品者負担)'},
        {id: "payment", name: '着払い(購入者が負担)'}
    ];

    const shippingMethods =  [
        {id: "select3", name: '選択してください'},
        {id: "letterPackLight", name: 'レターパックライト'},
        {id: "letterPackPlus", name: 'レターパックプラス'},
        {id: "quickPost", name: 'クイックポスト'},
        {id: "expressCompact", name: '宅急便コンパクト'},
        {id: "yuPack", name: 'ゆうパック元払い'},
        {id: "yamatoExpress", name: 'ヤマト宅急便'},
        {id: "yuPacket", name: 'ゆうパケット'},
        {id: "yuMail", name: 'ゆうメール元払い'},
        {id: "smartLetter", name: 'スマートレター'},
        {id: "usuallyExpress", name: '普通郵便'},
        {id: "yamato", name: 'ヤマト便'},
    ];

    const shippingDays =  [
        {id: "select4", name: '選択してください'},
        {id: "1.2days", name: '支払い後、1~2日後'},
        {id: "2.3days", name: '支払い後、2~3日後'},
        {id: "4.7days", name: '支払い後、4~7日後'}
    ];

    const shippingAreas  =  [
        {id: "select5", name: '選択してください'},
        {id: "Hokaido", name: '北海道'},
        {id: "Aomori", name: '青森県'},
        {id: "Iwate", name: '岩手県'},
        {id: "Miyagi", name: '宮城県'},
        {id: "Akita", name: '秋田県'},
        {id: "Yamagata", name: '山形県'},
        {id: "Hukushima", name: '福島県'},
        {id: "Ibaragi", name: '茨城県'},
        {id: "Tochigi", name: '栃木県'},
        {id: "Gunma", name: '群馬県'},
        {id: "Saitama", name: '埼玉県'},
        {id: "Chiba", name: '千葉県'},
        {id: "Tokyo", name: '東京都'},
        {id: "Kanagawa", name: '神奈川県'},
        {id: "Nigata", name: '新潟県'},
        {id: "Toyama", name: '富山県'},
        {id: "Ishikawa", name: '石川県'},
        {id: "Hukui", name: '福井県'},
        {id: "Yamanashi", name: '山梨県'},
        {id: "Nagano", name: '長野県'},
        {id: "Gihu", name: '岐阜県'},
        {id: "Shizuoka", name: '静岡県'},
        {id: "Aichi", name: '愛知県'},
        {id: "Mie", name: '三重県'},
        {id: "Shiga", name: '滋賀県'},
        {id: "Kyoto", name: '京都府'},
        {id: "Osaka", name: '大阪府'},
        {id: "Hyogo", name: '兵庫県'},
        {id: "Nara", name: '奈良県'},
        {id: "Wakayama", name: '和歌山県'},
        {id: "Totori", name: '鳥取県'},
        {id: "Shimane", name: '島根県'},
        {id: "Okayama", name: '岡山県'},
        {id: "Hiroshima", name: '広島県'},
        {id: "Yamaguchi", name: '山口県'},
        {id: "Tokushima", name: '徳島県'},
        {id: "Kagawa", name: '香川県'},
        {id: "Ehime", name: '愛媛県'},
        {id: "Kochi", name: '高知県'},
        {id: "Hukuoka", name: '福岡県'},
        {id: "Saga", name: '佐賀県'},
        {id: "Nagasaki", name: '長崎県'},
        {id: "Kumamoto", name: '熊本県'},
        {id: "Oita", name: '大分県'},
        {id: "Miyazaki", name: '宮崎県'},
        {id: "Kagoshima", name: '鹿児島県'},
        {id: "Okinawa", name: '沖縄県'}
    ];

    // ----------------------------------
    // categories コレクション 
    // ----------------------------------
 useEffect(() => {
    db.collection('categories')
    .orderBy('order','asc')
    .get()
    .then(snapshots => {
      const list = []
      snapshots.forEach(snapshot => {
       const data = snapshot.data()
       console.log(data)
       list.push({
         id: data.id,
         name: data.name
       })
       //  list.push(snapshot.data())
      })
      setCategories(list)
    })
  }, []);

  useEffect(() => {
    // id が空でない場合
    if (id !== "") {
      db.collection('products').doc(id).get()
        .then(snapshot => {
            const data = snapshot.data();
            setImages(data.images);
            setName(data.name);
            setDescription(data.description);
            setSizes(data.sizes); 
            setCategory(data.category);
            setState(data.state);
            setShippingFee(data.shippingFee);
            setShippingArea(data.shippingArea);
            setShippingDay(data.shippingDay);
            setShippingMethod(data.shippingMethod);
            setPrice(data.price);
        })
    }
}, [id])

 return(
     <div className="common__item">
   <div className="common__center">
       <h2>商品登録</h2>
       <Item>
       <ImageArea images={images} setImages={setImages} />
       </Item>
      <Item>
      <TextInput
      label={"商品名"}
      placeholder={"入力してください"}
      type={"text"}
      required={true}
      name={"name"}
      id={"name"}
      className={"name"}
      autocomplete={"off"}
      value={name}
      onChange={inputName}
     />

     <TextArea onChange={inputDescription} value={description} label={'商品説明'} />

    <TextInput
      label={"商品価格"}
      placeholder={"入力してください"}
      type={"number"}
      required={true}
      name={"price"}
      id={"price"}
      className={"price"}
      autocomplete={"off"}
      value={price}
      onChange={inputPrice}
     />  
     <hr />
     <SetSizesArea sizes={sizes} setSizes={setSizes}/>
      </Item>   
     <hr />
     <Item>
     <SelectBox 
     name={"category"}
     id={"category"}
     label={"カテゴリー"}
     options={categories}
     select={setCategory}
     value={category}
     />
     <SelectBox 
     name={"state"}
     id={"state"}
     label={"商品の状態"}
     options={states}
     select={setState}
     value={state}
     />
     </Item>
     <hr />
    <Item>
    <SelectBox 
     name={"shippingFee"}
     id={"shippingFee"}
     label={"配送料の負担"}
     options={shippingFees}
     select={setShippingFee}
     value={shippingFee}
     />
     <SelectBox 
     name={"shippingMethod"}
     id={"shippingMethod"}
     label={"配送方法"}
     options={shippingMethods}
     select={setShippingMethod}
     value={shippingMethod}
     />
    <SelectBox 
     name={"shippingDay"}
     id={"shippingDay"}
     label={"配送日の目安"}
     options={shippingDays}
     select={setShippingDay}
     value={shippingDay}
     />
<SelectBox 
     name={"shippingArea"}
     id={"shippingArea"}
     label={"配送日地域"}
     options={shippingAreas}
     select={setShippingArea}
     value={shippingArea}
     /> 
     </Item>
     <Button onClick={() => dispatch(saveProduct(id,name,description,state,category,shippingFee,shippingMethod,shippingDay,shippingArea,images,price,sizes))}>
       商品情報を保存
     </Button>
   </div>
   </div>
 )
}

export default ProductEdit;