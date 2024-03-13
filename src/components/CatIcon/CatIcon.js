import React, { useEffect, useState, useCallback, useMemo} from 'react';
import './CatIcon.scss';
import { useSelector } from 'react-redux';
import fruitsIcon from '../../Images/cat-icon/1.fruits.png';
import vegIcon from '../../Images/cat-icon/2.vegetables.png';
import riceIcon from '../../Images/cat-icon/riceicon.png';
import cakeIcon from '../../Images/cat-icon/4.cake.png';
import burgerIcon from '../../Images/cat-icon/5.burger.png';
import iceIcon from '../../Images/cat-icon/6.ice.png';
import pizaIcon from '../../Images/cat-icon/7.piza.png';
import dozaIcon from '../../Images/cat-icon/8.dosa.png';
import ProductSlider from '../ProductSlider/ProductSlider';

export default function CatIcon() {
  const [dataFilter, setDataFilter] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const productData = useSelector((state) => state.product.productList);

  const categoryList = useMemo(() => [...new Set(productData.map(el => el.category))], [productData]);

  const handleFilterProduct = useCallback((category) => {
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase());
    setDataFilter(filter);
    setActiveCategory(category);
  }, [productData]);

  useEffect(() => {
    if (categoryList.length > 0) {
      handleFilterProduct(categoryList[0]); 
    }
  }, [categoryList, handleFilterProduct]);

  const images = [fruitsIcon, vegIcon, riceIcon, cakeIcon, burgerIcon, iceIcon, pizaIcon, dozaIcon];

  return (
    <div className='gg-cat-wrap' id='gg-cat123'>
      <h1 id='catSection'>Select from our range of products</h1>
      {
        dataFilter.length > 0 ? 
        <div>
      <div className="scroll-wrap">
        <div className="opt-wrap">
          {categoryList.map((el, i) => (
            <div onClick={() => handleFilterProduct(el)} className={`gg-category ${el === activeCategory ? 'gg-active' : ''}`} key={i}>
              <div className='gg-img'> <img src={images[i]} alt={el} /> </div>
              <span className='gg-catName'>{el}</span>
            </div>
          ))}
        </div>
      </div>
      {dataFilter.length > 0 && <ProductSlider productList={dataFilter} id={`second`} />}
      </div> : 
      <div className='gg-loading-cat'>
        Loading...
      </div>
      }
 
    </div>
  );
}
