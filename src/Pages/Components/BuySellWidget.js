import React from 'react';
import { useState, useEffect, useContext } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {AuthContext} from '../../Auth';

function BuySellWidget(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buyProperty, setBuyProperty] = useState(0);
    const [sellProperty, setSellProperty] = useState(0);
    const [value, setValue] = useState(0);
    const [index, setIndex] = useState(0);
    const {currentUser} = useContext(AuthContext);
    const date = new Date();
    const tradeDate = [date.getMonth()+1,date.getDate(),date.getFullYear()];

    useEffect(() => {
        fetch("/Information?uid=" + currentUser.uid + "&coin_name=" + props.coinInfo.coin)
        .then(res => res.json())
        .then(
            (data) => {
                console.log(data);
                setBuyProperty(data.info.buy);
                setSellProperty(data.info.sell);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    const handleSubmit = (e) => {
        const buySellRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'trade': { coin_name: props.coinInfo.coin, amount: value, method: (index == 0) ? 'Buy' : 'Sell', uid: currentUser.uid, date: tradeDate, price: props.coinInfo.price } })
        };
        fetch('/Information', buySellRequest)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
           <Tabs
                selectedIndex={index}
                onSelect={(index) => setIndex(index)}
                style={{ width: 500 }}
            >
                <TabList>
                    <Tab>Buy</Tab>
                    <Tab>Sell</Tab>
                </TabList>
                <TabPanel style={{ width: 500 }}>
                    <form onSubmit={e => { handleSubmit(e) }}>
                        <label>Please type the amount of virtual currency you want to buy</label>
                        <label>You now have {buyProperty} virtual currency</label>
                        <br />
                        <input value={value} type="number"
                            onChange={e => {
                                if (e.target.value < 0) {
                                    alert("Please type in a positive value!");
                                } else if (e.target.value > buyProperty) {
                                    alert("Please input a value smaller than " + buyProperty);
                                } else if (e.target.value > buyProperty) {
                                    alert("Please input a value smaller than " + buyProperty);
                                } else {
                                    setValue(e.target.value);
                                }
                            }} />
                        <br />
                        <input value={value} type="range" max={buyProperty} step={0.00001}
                            onChange={e => {
                                setValue(e.target.value);
                            }} />
                        <br />
                        <button type="submit">Buy Now!</button>
                    </form>
                </TabPanel>
                <TabPanel style={{ width: 500 }} hidden={(sellProperty == 0) ? true : false }>
                    <label>Please type the amount of virtual currency you want to buy</label>
                    <label>You now have {sellProperty} {props.coinInfo.coin}</label>
                    <br />
                    <input value={value} type="number"
                        onChange={e => {
                            if (e.target.value < 0) {
                                alert("Please type in a positive value!");
                            } else if (e.target.value > sellProperty) {
                                alert("Please input a value smaller than " + sellProperty);
                            } else if (e.target.value > sellProperty) {
                                alert("Please input a value smaller than " + sellProperty);
                            } else {
                                setValue(e.target.value);
                            }
                        }} />
                    <br />
                    <input value={value} type="range" max={sellProperty} step={0.00001}
                        onChange={e => {
                            setValue(e.target.value);
                        }} />
                    <br />
                    <button type="submit">Sell Now!</button>
                </TabPanel>
            </Tabs>
        );
    }
}
export default BuySellWidget;