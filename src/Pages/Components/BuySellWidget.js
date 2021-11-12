import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AuthContext } from '../../Auth';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


function BuySellWidget(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buyProperty, setBuyProperty] = useState(0);
    const [sellProperty, setSellProperty] = useState(0);
    const [value, setValue] = useState(0);
    const [index, setIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [tradeNotify, setTradeNotify] = useState();
    const { currentUser } = useContext(AuthContext);
    const date = new Date();
    const tradeDate = [date.getMonth() + 1, date.getDate(), date.getFullYear()];

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
            .then(data => {
                console.log(data)
                setTradeNotify(data.info_trade)
                setShowPopup(true)
            });
        e.preventDefault();
    }

    const handleClose = () => {
        setShowPopup(false);
        window.location.reload(false);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div style={{position:"fixed", right:0, top:"30%"}}>
                <Tabs
                    selectedIndex={index}
                    onSelect={(index) => setIndex(index)}
                    style={{ width:300 }}
                >
                    <TabList>
                        <Tab>Buy</Tab>
                        <Tab>Sell</Tab>
                    </TabList>
                    <TabPanel style={{ width: 300, border: "1px solid #ddd",}}>
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
                    <TabPanel style={{ width:300 }} hidden={(sellProperty == 0) ? true : false}>
                        <form onSubmit={e => { handleSubmit(e) }}>
                            <label>Please type the amount of virtual currency you want to buy</label>
                            <label>You now have {sellProperty} {props.coinInfo.coin}, which is {sellProperty * props.coinInfo.price} virtual currency.</label>
                            <br />
                            <input value={value} type="number"
                                onChange={e => {
                                    if (e.target.value < 0) {
                                        alert("Please type in a positive value!");
                                    } else if (e.target.value > sellProperty * props.coinInfo.price) {
                                        alert("Please input a value smaller than " + sellProperty * props.coinInfo.price);
                                    } else {
                                        setValue(e.target.value);
                                    }
                                }} />
                            <br />
                            <input value={value} type="range" max={sellProperty * props.coinInfo.price} step={0.00001}
                                onChange={e => {
                                    setValue(e.target.value);
                                }} />
                            <br />
                            <button type="submit">Sell Now!</button>
                        </form>
                    </TabPanel>
                </Tabs>
                <Modal show={showPopup} onHide={handleClose}>
                    <Modal.Body>{tradeNotify}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default BuySellWidget;
