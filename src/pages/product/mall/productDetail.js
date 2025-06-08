//by ly 好像写重了。我的是活得，可能需要修改。
import { useNavigate, useParams} from 'react-router-dom';
import {Button, Layout } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {ServiceContext} from "../../../contexts/ServiceContext";
import { HomeOutlined, LeftOutlined, ShoppingCartOutlined} from "@ant-design/icons";
const { Content } = Layout;

const ProductDetail = () => {

    const footerStyle = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'white',
        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
        zIndex: 1000,
    };

    const iconContainerStyle = {
        display: 'flex',
        alignItems: 'center',

    };

    const iconStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '20px',
        color: '#666',
    };

    const iconInnerStyle = {
        fontSize: '24px',
        marginBottom: '5px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const buyNowButtonStyle = {
        backgroundColor: '#ff7e29',
        borderColor: '#ff7e29',
        color: 'white',
        marginRight: '10px',
    };

    const addToCartButtonStyle = {
        backgroundColor: '#ff4d4f',
        borderColor: '#ff4d4f',
        color: 'white',
    };

    const { id } = useParams();
    const { product: productService } = useContext(ServiceContext);
    const [ product, setProduct ] = useState([]);
    const { brand: brandService } = useContext(ServiceContext);
    const [ brand, setBrand ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setProduct(productService.getProductList());
        setBrand(brandService.getBrandList());
    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const filteredProduct = product.filter(item => item.id ===Number(id));
    const filteredBrand = brand.filter(item => item.id ===filteredProduct[0].brandId);
    const handleClick = () => {
        navigate(-1); //跳转到上一页
    };

    const handleHomeOutlinedClick = () => {
        navigate("/mall/mallHome"); //跳转
    };


    const handleShoppingCartOutlinedClick = () => {
        navigate("/mall/mallShoppingCar"); //跳转
    };


    const handleBuyNowClick = () => {
        //todo

    };

    const handleAddToCarClick = () => {
        //todo

    };

    return (


        // style={{ height: '91vh' }}
        <>
            <Layout >



                <Layout>

                    <Content >
                        <LeftOutlined
                            style={{
                                fontSize: '30px',
                                position: 'fixed',
                                top: '5px',  // Adjust as needed
                                zIndex: 10, // Ensure it is above other elements
                                cursor: 'pointer',

                            }}
                            onClick={handleClick}
                        />
                        {filteredProduct.length > 0 ? (
                            <>
                                <div  style={{ border: '1px solid #eee',  }}>
                                    <img src={filteredProduct[0].src} alt={filteredProduct[0].name} style={{ width:"100%", height:"100%", objectFit: 'contain', marginRight: '10px' }} />
                                </div>

                                <div style={{marginLeft:"5%"}}>
                                    <span style={{ fontSize: '20px'}}>{filteredProduct[0].name}</span>
                                    <br/>
                                    <span style={{ fontSize: '17px', color:"#666"}}>{filteredProduct[0].title}</span>
                                    <span style={{ fontSize: '20px', color: 'red', marginTop: '5px', display: 'block' }}>¥ {filteredProduct[0].price}</span>
                                    <br/>
                                    <span style={{ fontSize: '15px', color:"#666"}}>销量：{filteredProduct[0].inventory} </span>
                                    <span style={{ marginLeft:"15%",fontSize: '15px', color:"#666"}}>库存：{filteredProduct[0].inventory} </span>
                                    <span style={{ marginLeft:"15%", fontSize: '15px', color:"#666"}}>浏览量：{filteredProduct[0].inventory} </span>

                                </div>
                                <hr/>

                                <div style={{textAlign: 'center', border: '1px solid #eee', width:"100%", marginTop:"2%"}}>
                                    <span style={{ fontSize: '17px' }}>品牌信息</span>
                                    <br/>
                                    {filteredBrand.length > 0 ? (
                                        <div  style={{ display: 'flex', alignItems: 'center', textAlign: 'left', border: '1px solid #eee', margin:"2%" }} onClick={() => navigate('/mall/productBrandList/' + filteredBrand[0].id)}>
                                            <img src={filteredBrand[0].src} alt={filteredBrand[0].name} style={{ width:"50%", height:"50%", objectFit: 'contain', marginRight: '10px' }} />
                                            <div style={{ flex: '1' }}>
                                                <span style={{ fontSize: '17px' }}>{filteredBrand[0].name}</span>
                                            </div>

                                        </div>


                                    ) : (
                                        <p style={{textAlign: 'center'}}>无品牌</p>
                                    )}
                                </div>
                                <hr/>

                                <div style={{textAlign: 'center', border: '1px solid #eee', marginTop:"2%"}}>
                                    <span style={{ fontSize: '17px' }}>图文详情</span>
                                    <br/>

                                    <img src={filteredProduct[0].detailSrc} alt={filteredProduct[0].name} style={{ width:"95%", height:"100%", objectFit: 'contain',}} />

                                </div>



                            </>

                        ) : (
                            <p style={{textAlign: 'center'}}>无商品</p>
                        )}


                    </Content>

                    <div style={{ paddingBottom: '60px' }}>
                        <div style={footerStyle}>
                            <div style={iconContainerStyle}>
                                <div style={iconStyle} onClick={handleHomeOutlinedClick}>
                                    <HomeOutlined style={iconInnerStyle} />
                                    <span>首页</span>
                                </div>
                                <div style={iconStyle} onClick={handleShoppingCartOutlinedClick}>
                                    <ShoppingCartOutlined style={iconInnerStyle} />
                                    <span>购物车</span>
                                </div>
                            </div>
                            <div style={buttonContainerStyle}>
                                <Button type="primary" style={buyNowButtonStyle} onClick={handleBuyNowClick}>立即购买</Button>
                                <Button type="default" style={addToCartButtonStyle} onClick={handleAddToCarClick}>加入购物车</Button>
                            </div>
                        </div>
                        );

                    </div>



                </Layout>
            </Layout>
        </>
    );
};

export default ProductDetail