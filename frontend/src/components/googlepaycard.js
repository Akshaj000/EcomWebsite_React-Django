import React from "react";
import GooglePayButton from '@google-pay/button-react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import OrderContext from "../context/OrderContext";

export default function Googlepaybutton(props){
    let Navigate = useNavigate()

    let {addOrder} = useContext(OrderContext)

    let onCLickhandler=()=>{
        console.log("clicked")
    }
    return(
    <GooglePayButton
        id={props.id}
        environment="TEST"
        buttonSizeMode="fill"
        paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: '12345678901234567890',
              merchantName: 'Demo Merchant',
            },
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPriceLabel: 'Total',
              totalPrice: props.totalPrice,
              currencyCode: 'INR',
              countryCode: 'IN',
            },
          }}
        onLoadPaymentData={paymentData=>{
            console.log('TODO: send order to server', paymentData.paymentMethodData);
            addOrder(props.cartList,true)
        }}
        onCancel={() => addOrder(props.cartList,false)}
    />
    )
}