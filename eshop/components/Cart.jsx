import React, { useRef } from 'react';
import Link from 'next/link';

import {
  AiOutlineMinus, AiOutlinePlus, 
  AiOutlineLeft, AiOutlineShopping
} from 'react-icons/ai';

import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, decQty, incQty, qty } = useStateContext();
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button 
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}>
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantities})</span>
        </button>

        {cartItems.length <1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button 
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >=1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image'/>
              <div className='item-desc'>
                <div className='flex-top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <div className="quantity">
                      <h3>Quantity:</h3>
                      <p className="quantity-desc">
                        <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                        <span className="num">{qty}</span>
                        <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                      </p>
                    </div>
                  </div>
                  <button 
                    type='button'
                    className='remove-item'
                    onClick=''
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cart