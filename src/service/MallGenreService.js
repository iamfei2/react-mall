//by ly
import coat from "./images/外套.png";
import Tshirt from "./images/T恤.png";
import casualPants from "./images/休闲裤.png";
import jeans from "./images/牛仔裤.png";
import shirt from "./images/衬衫.png";
import mobileCommunication from "./images/手机通讯.png"
import phoneAccessories from "./images/手机配件.png"
import photography from "./images/摄像摄影.png"
import audio from "./images/影音娱乐.png"
import digitalAccessories from "./images/数码配件.png"
import television from "./images/电视.png"
import airConditioning from "./images/空调.png"
import washingMachine from "./images/洗衣机.png"
import refrigerator from "./images/冰箱.png"
import kitchenAppliances from "./images/厨卫大电.png"
import bathroom from "./images/厨房卫浴.png"
import lighting from "./images/灯饰照明.png"
import hardware from  "./images/五金工具.png"
import bedroom from "./images/卧室家具.png"
import livingRoom from "./images/客厅家具.png"
import newCar from "./images/全新整车.png"
import carElectronics from "./images/车载电器.png"
import maintenance from "./images/维修保养.png"
import carDecoration from "./images/汽车装饰.png"
import tablet from "./images/平板电脑.png"
import notebook from "./images/笔记本.png"
import hardDisk from "./images/硬盘.png"
const defaultMallGenreList = [
    {
        id:1,
        frontName: `clothes`,
        name: `服装`,
        children:[
            {
                id:2,
                frontName:'coat',
                name:'外套',
                src:coat,
            },
            {
                id:3,
                frontName:'tshirt',
                name: `T恤`,
                src:Tshirt,
            },
            {
                id:4,
                frontName:'casualPants',
                name: `休闲裤`,
                src:casualPants,

            },
            {
                id:5,
                frontName:'jeans',
                name: `牛仔裤`,
                src:jeans,
            },
            {
                id:6,
                frontName:'shirt',
                name: `衬衫`,
                src:shirt,
            },
        ]

    },
    {
        id:7,
        frontName: `phone`,
        name: `手机数码`,
        children:[
            {
                id:8,
                frontName:'mobileCommunication',
                name:'手机通讯',
                src:mobileCommunication,
            },
            {
                id:9,
                frontName:'phoneAccessories',
                name: `手机配件`,
                src:phoneAccessories,
            },
            {
                id:10,
                frontName:'photography',
                name: `摄影摄像`,
                src:photography,

            },
            {
                id:11,
                frontName:'audio',
                name: `影音娱乐`,
                src:audio,
            },
            {
                id:12,
                frontName:'digitalAccessories',
                name: `数码配件`,
                src:digitalAccessories,
            },
        ]

    },
    {
        id:13,
        frontName: `appliances`,
        name: `家用电器`,
        children:[
            {
                id:14,
                frontName:'television',
                name:'电视',
                src:television,
            },
            {
                id:15,
                frontName:'airConditioning',
                name: `空调`,
                src:airConditioning,
            },
            {
                id:16,
                frontName:'washingMachine',
                name: `洗衣机`,
                src:washingMachine,

            },
            {
                id:17,
                frontName:'refrigerator',
                name: `冰箱`,
                src:refrigerator,
            },
            {
                id:18,
                frontName:'kitchenAppliances',
                name: `厨卫大电`,
                src:kitchenAppliances,
            },
        ]


    },
    {
        id:19,
        frontName: `decoration`,
        name: `家具家装`,
        children:[
            {
                id:20,
                frontName:'bathroom',
                name:'厨房卫浴',
                src:bathroom,
            },
            {
                id:21,
                frontName:'lighting',
                name: `灯饰照明`,
                src:lighting,
            },
            {
                id:22,
                frontName:'hardware',
                name: `五金工具`,
                src:hardware,

            },
            {
                id:23,
                frontName:'bedroom',
                name: `卧室家具`,
                src:bedroom,
            },
            {
                id:24,
                frontName:'livingRoom',
                name: `客厅家具`,
                src:livingRoom,
            },
        ]


    },
    {
        id:25,
        frontName: `car`,
        name: `汽车用品`,
        children:[
            {
                id:26,
                frontName:'newCar',
                name:'全新整车',
                src:newCar,
            },
            {
                id:27,
                frontName:'carElectronics',
                name: `车载电器`,
                src:carElectronics,
            },
            {
                id:28,
                frontName:'maintenance',
                name: `维修保养`,
                src:maintenance,

            },
            {
                id:29,
                frontName:'carDecoration',
                name: `汽车装饰`,
                src:carDecoration,
            },

        ]

    },
    {
        id :30,
        frontName: `computer`,
        name: `电脑办公`,
        children:[
            {
                id:31,
                frontName:'tablet',
                name:'平板电脑',
                src:tablet,
            },
            {
                id:32,
                frontName:'notebook',
                name: `笔记本`,
                src:notebook,
            },
            {
                id:33,
                frontName:'hardDisk',
                name: `硬盘`,
                src:hardDisk,

            },


        ]

    },
];
class MallGenreService {
    mallGenreList = [];

    constructor() {
        this._getData();
    }

    getMallGenre() {
        return this.mallGenreList.concat();
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

        this.mallGenreList = defaultMallGenreList;
        this._setData();

    }

    _setData() {
        localStorage.setItem('mallGenreList', JSON.stringify(this.mallGenreList));
    }
}

export default MallGenreService;