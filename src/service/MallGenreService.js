import coat from "./images/鼠标.png";
import Tshirt from "./images/键盘.png";
import casualPants from "./images/耳机.png";
import jeans from "./images/U盘.png";
import shirt from "./images/扩展坞.png";
import chipsSnacks from "./images/零食.png"
import candyChocolate from "./images/巧克力.png"
import biscuits from "./images/饼干.png"
import driedFruits from "./images/果干.png"
import nutsSeeds from "./images/坚果.png"
import bathroom from "./images/电动牙刷.png"
import lighting from "./images/冲牙器.png"
import hardware from "./images/电吹风.png"
import bedroom from "./images/卷发器.png"
import livingRoom from "./images/剃须刀.png"
import newCar from "./images/运动.png"
import carElectronics from "./images/微单.png"
import maintenance from "./images/ccd.png"
import carDecoration from "./images/配件.png"

const defaultMallGenreList = [
    {
        id: 1,
        frontName: `clothes`,
        name: `外设`,
        children: [
            {
                id: 2,
                frontName: 'coat',
                name: '鼠标',
                src: coat,
            },
            {
                id: 3,
                frontName: 'tshirt',
                name: `键盘`,
                src: Tshirt,
            },
            {
                id: 4,
                frontName: 'casualPants',
                name: `耳机`,
                src: casualPants,

            },
            {
                id: 5,
                frontName: 'jeans',
                name: `U盘`,
                src: jeans,
            },
            {
                id: 6,
                frontName: 'shirt',
                name: `扩展坞`,
                src: shirt,
            },
        ]
    },
    {
        id: 7,
        frontName: `food`,
        name: `零食`,
        children: [
            {
                id: 8,
                frontName: 'chipsSnacks',
                name: `休闲零食`,
                src: chipsSnacks,
            },
            {
                id: 9,
                frontName: 'candyChocolate',
                name: `糖果巧克力`,
                src: candyChocolate,
            },
            {
                id: 10,
                frontName: 'biscuits',
                name: `饼干糕点`,
                src: biscuits,
            },
            {
                id: 11,
                frontName: 'driedFruits',
                name: `果干蜜饯`,
                src: driedFruits,
            },
            {
                id: 12,
                frontName: 'nutsSeeds',
                name: `坚果炒货`,
                src: nutsSeeds,
            },
        ]
    },
    {
        id: 19,
        frontName: `decoration`,
        name: `个护健康`,
        children: [
            {
                id: 20,
                frontName: 'bathroom',
                name: '电动牙刷',
                src: bathroom,
            },
            {
                id: 21,
                frontName: 'lighting',
                name: `冲牙器`,
                src: lighting,
            },
            {
                id: 22,
                frontName: 'hardware',
                name: `电吹风`,
                src: hardware,

            },
            {
                id: 23,
                frontName: 'bedroom',
                name: `卷发器`,
                src: bedroom,
            },
            {
                id: 24,
                frontName: 'livingRoom',
                name: `剃须刀`,
                src: livingRoom,
            },
        ]
    },
    {
        id: 25,
        frontName: `car`,
        name: `相机`,
        children: [
            {
                id: 26,
                frontName: 'newCar',
                name: '运动相机',
                src: newCar,
            },
            {
                id: 27,
                frontName: 'carElectronics',
                name: `微单相机`,
                src: carElectronics,
            },
            {
                id: 28,
                frontName: 'maintenance',
                name: `CCD相机`,
                src: maintenance,

            },
            {
                id: 29,
                frontName: 'carDecoration',
                name: `相机配件`,
                src: carDecoration,
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