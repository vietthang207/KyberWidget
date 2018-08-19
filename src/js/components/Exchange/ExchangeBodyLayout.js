import React from "react"
import { NavLink } from 'react-router-dom'
import { roundingNumber } from "../../utils/converter"
import { Link } from 'react-router-dom'
import constants from "../../services/constants"
import ReactTooltip from 'react-tooltip'
import { filterInputNumber } from "../../utils/validators";

import * as converter from "../../utils/converter"

const ExchangeBodyLayout = (props) => {

  function handleChangeSource(e) {
    var check = filterInputNumber(e, e.target.value, props.input.sourceAmount.value)
    if (check) props.input.sourceAmount.onChange(e)
  }

  function handleChangeDest(e) {
    var check = filterInputNumber(e, e.target.value, props.input.destAmount.value)
    if (check) props.input.destAmount.onChange(e)
  }



  // var errorSelectSameToken = props.errors.selectSameToken && props.errors.selectSameToken !== '' ? props.translate(props.errors.selectSameToken) : ''
  // var errorSelectTokenToken = props.errors.selectTokenToken && props.errors.selectTokenToken !== '' ? props.translate(props.errors.selectTokenToken) : ''
  // var errorToken = errorSelectSameToken + errorSelectTokenToken

  var maxCap = props.maxCap
  var errorSource = []
  var errorExchange = false
  Object.keys(props.exchange.errors).map(key => {
    if (props.exchange.errors[key] && props.exchange.errors[key] !== ""){
      errorSource.push(props.translate(props.exchange.errors[key]) || props.exchange.errors[key])
      errorExchange = true
    }
  })
  // console.log("error_exchange")
  // console.log(errorSource)
  // console.log(props.errors)
  //if (errorSource)
  // if (props.errorNotPossessKgt && props.errorNotPossessKgt !== "") {
  //   errorSource.push(props.errorNotPossessKgt)
  //   errorExchange = true
  // } else {
  //   if (props.errors.exchange_enable && props.errors.exchange_enable !== "") {
  //     errorSource.push(props.translate(props.errors.exchange_enable))
  //     errorExchange = true
  //   } else {
  //     if (errorToken !== "") {
  //       errorSource.push(errorToken)
  //       errorExchange = true
  //     }
  //     if (props.errors.sourceAmount && props.errors.sourceAmount !== "") {
  //       if (props.errors.sourceAmount === "error.source_amount_too_high_cap") {
  //         if (props.sourceTokenSymbol === "ETH") {
  //           errorSource.push(props.translate("error.source_amount_too_high_cap", { cap: maxCap }))
  //         } else {
  //           errorSource.push(props.translate("error.dest_amount_too_high_cap", { cap: maxCap * constants.MAX_CAP_PERCENT }))
  //         }
  //       } else {
  //         errorSource.push(props.translate(props.errors.sourceAmount))
  //       }
  //       errorExchange = true
  //     }
  //     if (props.errors.rateSystem && props.errors.rateSystem !== "") {
  //       errorSource.push(props.translate(props.errors.rateSystem))
  //       errorExchange = true
  //     }
  //   }
  // }

  var errorShow = errorSource.map((value, index) => {
    return <span class="error-text" key={index}>{value}</span>
  })

  var classSource = "amount-input"
  if (props.focus === "source") {
    classSource += " focus"
  }
  if (errorExchange) {
    classSource += " error"
  }

  return  (
    <div id="exchange">
    <div className="grid-x">
      <div className="cell medium-12 large-12 swap-wrapper">
        <div className="grid-x exchange-col">
          <div className="cell exchange-col-1">

          <div className="exchange-pading exchange-pading-top">
            {props.networkError !== "" && (
              <div className="network_error">
                <span>
                  <img src={require("../../../assets/img/warning.svg")} />
                </span>
                <span>
                  {props.networkError}
                </span>
              </div>
            )}

            {/* <div className="payment-gateway__step-title payment-gateway__step-title--1">
              {props.translate("transaction.choose_your_payment") || "Choose your payment method"}
            </div> */}

            {props.exchange.isHaveDestAmount && (
              <div>
                <div className="pay-info">
                  <div className="info-1">
                    {props.translate("transaction.you_about_to_pay") || "You are about to pay"}
                  </div>

                  
                  <div className="info-2">
                    {props.global.params && props.global.params.receiveAddr && props.global.params.receiveAddr !== 'self' && (
                      <div className="info-2__content">
                        <div>{props.translate("transaction.address") || "Address"}:</div>                      
                        <div>{props.global.params.receiveAddr.slice(0, 8)} ... {props.global.params.receiveAddr.slice(-6)}</div>
                      </div>
                    )}  

                    <div className="info-2__content">
                      <div>{props.translate("transaction.amount") || "Amount"}:</div>
                      <div>{(''+props.exchange.destAmount).length > 8 ? converter.roundingNumber(props.exchange.destAmount) : props.exchange.destAmount} {props.exchange.destTokenSymbol}</div>
                    </div>
                  </div>
                  <div className="info-3">

                  </div>
                </div>
                <div>
                  <div className="choose-payment">
                    <span className="transaction-label">
                      {props.translate("transaction.exchange_paywith") || "PAY WITH"}
                    </span>
                    <div className={errorExchange ? "error select-token-panel" : "select-token-panel"}>
                      {props.tokenSourceSelect}

                      <div className="amount-pay">
                        <div>{props.translate("transaction.estimate_value_should_pay") || "Estimate value you should pay"}</div>

                        {props.exchange.sourceTokenSymbol !== props.exchange.destTokenSymbol && (
                          <div>{props.exchange.offeredRate == "0" ? 0 : converter.caculateSourceAmount(props.exchange.destAmount, props.exchange.offeredRate, 6)} {props.exchange.sourceTokenSymbol} </div>
                        )}
                        {props.exchange.sourceTokenSymbol === props.exchange.destTokenSymbol && (
                          <div>{(''+props.exchange.destAmount).length > 8 ? converter.roundingNumber(props.exchange.destAmount) : props.exchange.destAmount} {props.exchange.sourceTokenSymbol} </div>
                        )}
                      </div>
                    </div>
                    <div className={errorExchange ? "error" : ""}>
                      {errorShow}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!props.exchange.isHaveDestAmount && (
              <div>
                {props.global.params && props.global.params.receiveAddr && props.global.params.receiveAddr !== 'self' && (
                  <div className="pay-info">
                    <div className="info-1">
                      {props.translate("transaction.you_about_to_pay") || "You are about to pay"}
                    </div>
                    <div className="info-2">
                      <div className="info-2__content">
                        <div>{props.translate("transaction.address") || "Address"}:</div>
                        <div>{props.global.params.receiveAddr.slice(0, 8)} ... {props.global.params.receiveAddr.slice(-6)}</div>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <div className="choose-payment">
                    <span className="transaction-label">
                      {props.translate("transaction.exchange_paywith") || "PAY WITH"}
                    </span>
                    <div className={errorExchange ? "error select-token-panel" : "select-token-panel"}>
                      {props.tokenSourceSelect}
                      <span className="transaction-label amount-enter-label">
                        {props.translate("transaction.enter_amount") || "ENTER AMOUNT YOU WILL PAY"}
                      </span>
                      <div className={classSource}>
                        <div>
                          <input id="inputSource" className="source-input" min="0" step="0.000001"
                                 placeholder="0" autoFocus
                                 type="text" maxLength="50" autoComplete="off"
                                 value={props.input.sourceAmount.value}
                                 onFocus={props.input.sourceAmount.onFocus}
                                 onBlur={props.input.sourceAmount.onBlur}
                                 onChange={handleChangeSource}
                          />
                        </div>
                        <div>
                          <span>{props.sourceTokenSymbol}</span>
                        </div>
                      </div>
                    </div>
                    <div className={errorExchange ? "error" : ""}>
                      {errorShow}
                    </div>
                  </div>
                </div>
                {props.exchange.sourceTokenSymbol !== props.exchange.destTokenSymbol && (props.global.params && props.global.params.receiveAddr && props.global.params.receiveAddr === 'self') && (
                  <div className="estimate-dest-value">
                    {props.translate("transaction.estimate_dest_value") || "You will get approximately"}: {props.exchange.offeredRate == "0"? 0 : converter.caculateDestAmount(props.exchange.sourceAmount, props.exchange.offeredRate, 6)} {props.exchange.destTokenSymbol}
                  </div>
                )}
                {props.exchange.sourceTokenSymbol !== props.exchange.destTokenSymbol && (!props.global.params || !props.global.params.receiveAddr || props.global.params.receiveAddr !== 'self') && (
                  <div className="estimate-dest-value">
                    Estimate dest amount: {props.exchange.offeredRate == "0"? 0 : converter.caculateDestAmount(props.exchange.sourceAmount, props.exchange.offeredRate, 6)} {props.exchange.destTokenSymbol}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {props.advanceLayout}
          </div>
          <div className="exchange-pading">
            <div class="checkbox">
              <input id="term-agree" type="checkbox" onChange={props.acceptedTerm}/>
              <label for="term-agree">
              {props.translate("transaction.i_agree_to") || "I agree to"} <a href="https://files.kyber.network/tac.html" target="_blank">{props.translate("transaction.term_and_condition") || "Terms &amp; Conditions"}</a>
              </label>
            </div>
            <div className="button-payment">
              <button className={props.classNamePaymentbtn} onClick={(e) => props.importAccount(e)}>{props.translate("transaction.next") || "Next"}</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ExchangeBodyLayout
