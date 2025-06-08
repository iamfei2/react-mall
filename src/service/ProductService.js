//by ly 我的商品数据是活的，可能需要修改一个
import product1 from "./images/product1.png"
import product2 from "./images/product2.png"
import product3 from "./images/product3.png"
import product4 from "./images/product4.png"
import product5 from "./images/product5.png"
import product6 from "./images/product6.png"
import product7 from "./images/product7.png"
import product8 from "./images/product8.png"
import product9 from "./images/product9.png"
import product10 from "./images/product10.png"
import product11 from "./images/product11.png"
import product12 from "./images/product12.png"
import product13 from "./images/product13.png"
import product14 from "./images/product14.png"
import product15 from "./images/product15.png"
import product16 from "./images/product16.png"
import product17 from "./images/product17.png"
import product18 from "./images/product18.png"
import product19 from "./images/product19.png"
import productDatail from "./images/productDetail.jpg"
const defaultProductList = [
    {
        id: 0,
        name: `Apple/苹果 iPhone 15`,
        title: '【限时限量抢购】Apple产品年中狂欢节，好物尽享，美在智慧！速来 >> 勾选[保障服务][原厂保2年]，获得AppleCare+全方位服务计划，原厂延保售后无忧。',
        genreId: 8,
        brandId: 4,
        price: 4899,
        inventory: 238,
        isSeckill: true,
        isRecommend: false,
        src: product19,
        detailSrc: productDatail,
    },
    {
        id: 1,
        name: `华为 HUAWEI P20`,
        title: 'AI智慧全面屏 6GB +64GB 亮黑色 全网通版 移动联通电信4G手机 双卡双待手机 双卡双待',
        genreId: 8,
        brandId: 6,
        price: 3788,
        inventory: 100,
        isSeckill: true,
        isRecommend: false,
        src: product1,
        detailSrc: productDatail,
    },
    {
        id: 2,
        name: `小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待`,
        title: '骁龙845处理器，红外人脸解锁，AI变焦双摄，AI语音助手小米6X低至1299，点击抢购',
        genreId: 8,
        brandId: 1,
        price: 2699,
        inventory: 150,
        isSeckill: true,
        isRecommend: false,
        src: product2,
        detailSrc: productDatail,
    },
    {
        id: 3,
        name: `小米 红米5A 全网通版 3GB+32GB 香槟金 移动联通电信4G手机 双卡双待`,
        title: '8天超长待机，137g轻巧机身，高通骁龙处理器小米6X低至1299，点击抢购',
        genreId: 8,
        brandId: 1,
        price: 649,
        inventory: 155,
        isSeckill: true,
        isRecommend: false,
        src: product3,
        detailSrc: productDatail,
    },
    {
        id: 4,
        name: `Apple iPhone 8 Plus 64GB 红色特别版 移动联通电信4G手机`,
        title: '【限时限量抢购】Apple产品年中狂欢节，好物尽享，美在智慧！速来 >> 勾选[保障服务][原厂保2年]，获得AppleCare+全方位服务计划，原厂延保售后无忧。',
        genreId: 8,
        brandId: 4,
        price: 5499,
        inventory: 175,
        isSeckill: true,
        isRecommend: false,
        src: product4,
        detailSrc: productDatail,
    },
    {
        id: 5,
        name: `HLA海澜之家简约动物印花短袖T恤`,
        title: '2018夏季新品微弹舒适新款短T男生 6月6日-6月20日，满300减30，参与互动赢百元礼券，立即分享赢大奖',
        genreId: 3,
        brandId: 3,
        price: 98,
        inventory: 275,
        isSeckill: true,
        isRecommend: false,
        src: product5,
        detailSrc: productDatail,
    },
    {
        id: 6,
        name: `HLA海澜之家蓝灰花纹圆领针织布短袖T恤`,
        title: '2018夏季新品短袖T恤男HNTBJ2E080A 蓝灰花纹80 175/92A/L80A 蓝灰花纹80 175/92A/L',
        genreId: 3,
        brandId: 3,
        price: 98,
        inventory: 275,
        isSeckill: true,
        isRecommend: false,
        src: product6,
        detailSrc: productDatail,
    },
    {
        id: 7,
        name: `HLA海澜之家短袖T恤男基础款`,
        title: 'HLA海澜之家短袖T恤男基础款简约圆领HNTBJ2E153A藏青(F3)175/92A(50)',
        genreId: 3,
        brandId: 3,
        price: 98,
        inventory: 275,
        isSeckill: true,
        isRecommend: false,
        src: product7,
        detailSrc: productDatail,
    },
    {
        id: 8,
        name: `小米（MI）小米电视4A `,
        title: '小米（MI）小米电视4A 55英寸 L55M5-AZ/L55M5-AD 2GB+8GB HDR 4K超高清 人工智能网络液晶平板电视',
        genreId: 14,
        brandId: 1,
        price: 2499,
        inventory: 85,
        isSeckill: false,
        isRecommend: true,
        src: product8,
        detailSrc: productDatail,
    },
    {
        id: 9,
        name: `小米（MI）小米电视4A 65英寸`,
        title: ' L65M5-AZ/L65M5-AD 2GB+8GB HDR 4K超高清 人工智能网络液晶平板电视',
        genreId: 14,
        brandId: 1,
        price: 2499,
        inventory: 85,
        isSeckill: false,
        isRecommend: true,
        src: product9,
        detailSrc: productDatail,
    },
    {
        id: 10,
        name: `Apple iPhone 14 (A2884) 128GB 支持移动联通电信5G 双卡双待手机`,
        title: '【11.11大爱超大爱】指定iPhone14产品限时限量领券立减601元！！！部分iPhone产品现货抢购确认收货即送原厂手机壳10元优惠券！！！猛戳 ',
        genreId: 8,
        brandId: 4,
        price: 5999,
        inventory: 75,
        isSeckill: false,
        isRecommend: true,
        src: product10,
        detailSrc: productDatail,
    },
    {
        id: 11,
        name: `Apple iPad 10.9英寸平板电脑 2022年款`,
        title: '【11.11大爱超大爱】iPad9代限量抢购，价格优惠，更享以旧换新至高补贴325元！！快来抢购吧！！  ',
        genreId: 8,
        brandId: 4,
        price: 3599,
        inventory: 77,
        isSeckill: false,
        isRecommend: true,
        src: product11,
        detailSrc: productDatail,
    },
    {
        id: 12,
        name: `小米 Xiaomi Book Pro 14 2022 锐龙版 2.8K超清大师屏 高端轻薄笔记本电脑`,
        title: '【双十一大促来袭】指定型号至高优惠1000，以旧换新至高补贴1000元，晒单赢好礼',
        genreId: 32,
        brandId: 1,
        price: 5599,
        inventory: 49,
        isSeckill: false,
        isRecommend: true,
        src: product12,
        detailSrc: productDatail,
    },
    {
        id: 13,
        name: `小米12 Pro 天玑版 天玑9000+处理器 5000万疾速影像 2K超视感屏 120Hz高刷 67W快充`,
        title: '天玑9000+处理器、5160mAh大电量、2KAmoled超视感屏【点击购买小米11Ultra，戳】',
        genreId: 8,
        brandId: 1,
        price: 2999,
        inventory: 17,
        isSeckill: false,
        isRecommend: true,
        src: product13,
        detailSrc: productDatail,
    },
    {
        id: 14,
        name: `Redmi K50 天玑8100 2K柔性直屏 OIS光学防抖 67W快充 5500mAh大电量`,
        title: '【品质好物】天玑8100，2K直屏，5500mAh大电量【Note12Pro火热抢购中 ',
        genreId: 8,
        brandId: 1,
        price: 2099,
        inventory: 33,
        isSeckill: false,
        isRecommend: true,
        src: product14,
        detailSrc: productDatail,
    },
    {
        id: 15,
        name: `HUAWEI Mate 50 直屏旗舰 超光变XMAGE影像 北斗卫星消息`,
        title: '【华为Mate50新品上市】内置66W华为充电套装，超光变XMAGE影像,北斗卫星消息，鸿蒙操作系统3.0！立即抢购！华为新品可持续计划，猛戳》  ',
        genreId: 8,
        brandId: 6,
        price: 4999,
        inventory: 95,
        isSeckill: false,
        isRecommend: true,
        src: product15,
        detailSrc: productDatail,
    },
    {
        id: 16,
        name: `万和（Vanward)燃气热水器天然气家用四重防冻直流变频节能全新升级增压水伺服恒温高抗风`,
        title: '【家电11.11享低价，抢到手价不高于1199】【发布种草秀享好礼！同价11.11买贵补差】爆款超一级能效零冷水】 ',
        genreId: 18,
        brandId: 7,
        price: 1799,
        inventory: 177,
        isSeckill: false,
        isRecommend: true,
        src: product16,
        detailSrc: productDatail,
    },
    {
        id: 17,
        name: `三星（SAMSUNG）500GB SSD固态硬盘 M.2接口(NVMe协议)`,
        title: '【满血无缓存！进店抽百元E卡，部分型号白条三期免息】兼具速度与可靠性！读速高达3500MB/s，全功率模式！点击 ',
        genreId: 33,
        brandId: 5,
        price: 3599,
        inventory: 55,
        isSeckill: false,
        isRecommend: true,
        src: product17,
        detailSrc: productDatail,
    },
    {
        id: 18,
        name: `OPPO Reno8 8GB+128GB 鸢尾紫 新配色上市 80W超级闪充 5000万水光人像三摄`,
        title: '【11.11提前购机享价保，好货不用等，系统申请一键价保补差!】【Reno8Pro爆款优惠】',
        genreId: 8,
        brandId: 2,
        price: 2299,
        inventory: 71,
        isSeckill: false,
        isRecommend: true,
        src: product18,
        detailSrc: productDatail,
    },

];
class ProductService {
    productList = [];

    constructor() {
        this._getData();
    }

    getProductList() {
        return this.productList.concat();
    }


    getProductsByGenreId(id) {
        return this.productList.find((product) => product.genreId === id);
    }

    // getDisplayMenus() {
    //     const buildTree = (menuList, parentId = 0) => {
    //         return menuList
    //             .filter((menu) => menu.enable && menu.parent === parentId)
    //             .map((menu) => {
    //                 const children = buildTree(menuList, menu.id);
    //                 return {
    //                     ...menu,
    //                     children: children.length ? children : undefined,
    //                 };
    //             });
    //     };
    //     return buildTree(this.menuList);
    // }
    //
    // addMenu(menu) {
    //     menu.id = this.menuList.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
    //     this.menuList.push(menu);
    //     this._setData();
    // }
    //
    // editMenu(menu) {
    //     const index = this.menuList.findIndex((m) => m.id === menu.id);
    //     if (index !== -1) {
    //         if (this.menuList[index].locked) {
    //             return;
    //         }
    //         this.menuList[index] = menu;
    //         this._setData();
    //     }
    // }
    //
    // deleteMenu(id) {
    //     const index = this.menuList.findIndex((menu) => menu.id === id);
    //     if (index !== -1) {
    //         if (this.menuList[index].locked) {
    //             return;
    //         }
    //         this.menuList.splice(index, 1);
    //         this._setData();
    //     }
    // }

    _getData() {
        // const data = localStorage.getItem('mallGenreList');
        // if (data) {
        //     this.mallGenreList = JSON.parse(data);
        // } else {
        //     this.mallGenreList = defaultMallGenreList;
        //     this._setData();
        // }

        this.productList = defaultProductList;
        this._setData();

    }

    _setData() {
        localStorage.setItem('productList', JSON.stringify(this.productList));
    }
}

export default ProductService;