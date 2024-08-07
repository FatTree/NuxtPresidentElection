import { describe, it, expect } from 'vitest';
import type { CodeModel, TicketModel, TicketGeneratedModel } from '~/models/data/ElectionModel';
import type { MapViewModel, tempList } from '~/models/view/ViewModel';
import { 
    generateCode, 
    compare, 
    groupBy, 
    getTicketWinnerList, 
    combineWinnerAndColorList,
    combineWinnerColorAndMapList
} from '~/utils';


describe('util - generateCode', () => {
    const _mockData: CodeModel = {
        area_code: "00",
        city_code: "000",
        dept_code: "130",
        li_code: "0012",
        prv_code: "63",
    }
    it('Generate correct Code', () => {
        expect(generateCode(_mockData)).toBe('63_000_00_130_0012');
    });
});

const cityPath = [
    {
        name: ['南投縣'],
        path: `
        <g id="Nantou">
        `
    }
];


describe('util - Other Generator', () => {
    const OAColorTable = [
        {
          "party_code": "1",
          "party_name": "中國國民黨",
          "color_code": "6B6BE4"
        },
        {
          "party_code": "2",
          "party_name": "中國青年黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10",
          "party_name": "中國民眾黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "14",
          "party_name": "中國忠義黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "15",
          "party_name": "勞動黨",
          "color_code": "E96363"
        },
        {
          "party_code": "16",
          "party_name": "民主進步黨",
          "color_code": "76BC89"
        },
        {
          "party_code": "30",
          "party_name": "民主自由黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "42",
          "party_name": "農民黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "64",
          "party_name": "中國婦女黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "66",
          "party_name": "全國民主非政黨聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "73",
          "party_name": "公民黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "74",
          "party_name": "新黨",
          "color_code": "F4D625"
        },
        {
          "party_code": "78",
          "party_name": "先進黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "79",
          "party_name": "綠黨",
          "color_code": "66CC66"
        },
        {
          "party_code": "82",
          "party_name": "建國黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "84",
          "party_name": "社會改革黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "85",
          "party_name": "民主聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "86",
          "party_name": "新國家連線",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "90",
          "party_name": "親民黨",
          "color_code": "F68D55"
        },
        {
          "party_code": "92",
          "party_name": "大中華統一陣線",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "94",
          "party_name": "臺灣慧行志工黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "95",
          "party_name": "台灣團結聯盟",
          "color_code": "D2AF79"
        },
        {
          "party_code": "97",
          "party_name": "台灣吾黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "98",
          "party_name": "中華民族致公黨",
          "color_code": "BFBFBF"
        },
        {
          "party_code": "101",
          "party_name": "台灣工黨",
          "color_code": "008001"
        },
        {
          "party_code": "103",
          "party_name": "世界和平黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "104",
          "party_name": "工教聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "106",
          "party_name": "無黨團結聯盟",
          "color_code": "CC6688"
        },
        {
          "party_code": "110",
          "party_name": "保護台灣大聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "113",
          "party_name": "中華統一促進黨",
          "color_code": "707FC2"
        },
        {
          "party_code": "114",
          "party_name": "中國民主進步黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "116",
          "party_name": "台灣建國聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "121",
          "party_name": "客家黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "127",
          "party_name": "台灣國民黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "128",
          "party_name": "台灣農民黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "130",
          "party_name": "第三社會黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "132",
          "party_name": "大道慈悲濟世黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "134",
          "party_name": "大愛憲改聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "151",
          "party_name": "中華婦女黨",
          "color_code": "FF33FF"
        },
        {
          "party_code": "153",
          "party_name": "人民最大黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "166",
          "party_name": "台灣主義黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "169",
          "party_name": "大道人民黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "170",
          "party_name": "台灣民意黨",
          "color_code": "821177"
        },
        {
          "party_code": "176",
          "party_name": "圓黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "179",
          "party_name": "中華照生黨",
          "color_code": "896AB6"
        },
        {
          "party_code": "187",
          "party_name": "中華台商愛國黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "188",
          "party_name": "正黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "190",
          "party_name": "台灣民族黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "191",
          "party_name": "中華聯合黨",
          "color_code": "B7856D"
        },
        {
          "party_code": "196",
          "party_name": "教科文預算保障e聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "198",
          "party_name": "新華勞動黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "199",
          "party_name": "人民民主黨",
          "color_code": "F47171"
        },
        {
          "party_code": "201",
          "party_name": "正義聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "202",
          "party_name": "臺灣建國黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "206",
          "party_name": "言論自由聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "209",
          "party_name": "聯合黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "210",
          "party_name": "三等國民公義人權自救黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "211",
          "party_name": "台灣革命黨",
          "color_code": "FD9D79"
        },
        {
          "party_code": "219",
          "party_name": "台灣進步黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "224",
          "party_name": "台灣整復師聯盟工黨",
          "color_code": "822987"
        },
        {
          "party_code": "227",
          "party_name": "全民的黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "230",
          "party_name": "中華新住民黨",
          "color_code": "FDCE03"
        },
        {
          "party_code": "234",
          "party_name": "台灣第一民族黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "236",
          "party_name": "新生黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "240",
          "party_name": "司法正義黨",
          "color_code": "6C2324"
        },
        {
          "party_code": "249",
          "party_name": "中華文化民主黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "250",
          "party_name": "中國國家社會主義勞工黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "251",
          "party_name": "中國生產黨",
          "color_code": "203391"
        },
        {
          "party_code": "254",
          "party_name": "中華民主向日葵憲政改革聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "255",
          "party_name": "勞工黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "256",
          "party_name": "中華民國機車黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "257",
          "party_name": "天宙和平統一家庭黨",
          "color_code": "F2938A"
        },
        {
          "party_code": "258",
          "party_name": "軍公教聯盟黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "259",
          "party_name": "樹黨",
          "color_code": "B4D100"
        },
        {
          "party_code": "264",
          "party_name": "經濟黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "266",
          "party_name": "和平鴿聯盟黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "267",
          "party_name": "時代力量",
          "color_code": "F2CB0D"
        },
        {
          "party_code": "268",
          "party_name": "民國黨",
          "color_code": "FCC800"
        },
        {
          "party_code": "269",
          "party_name": "社會民主黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "272",
          "party_name": "自由台灣黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "273",
          "party_name": "台灣獨立黨",
          "color_code": "00823A"
        },
        {
          "party_code": "275",
          "party_name": "新政世紀黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "277",
          "party_name": "社會福利黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "278",
          "party_name": "臺灣前進黨",
          "color_code": "6FB7F1"
        },
        {
          "party_code": "279",
          "party_name": "台灣未來黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "281",
          "party_name": "綠黨社會民主黨聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "283",
          "party_name": "信心希望聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "290",
          "party_name": "皇君人民政黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "292",
          "party_name": "聾國黨",
          "color_code": "009BBD"
        },
        {
          "party_code": "293",
          "party_name": "興中同盟會",
          "color_code": "CC3445"
        },
        {
          "party_code": "295",
          "party_name": "全國人民黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "302",
          "party_name": "金門高粱黨",
          "color_code": "E1C52A"
        },
        {
          "party_code": "303",
          "party_name": "台灣基進",
          "color_code": "C38071"
        },
        {
          "party_code": "306",
          "party_name": "台灣動物保護黨",
          "color_code": "467E75"
        },
        {
          "party_code": "307",
          "party_name": "中華文化復興在理黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "309",
          "party_name": "華裔和合黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "310",
          "party_name": "青年陽光黨",
          "color_code": "F2A25A"
        },
        {
          "party_code": "312",
          "party_name": "民生公益",
          "color_code": "B01F24"
        },
        {
          "party_code": "315",
          "party_name": "臺灣人民共產黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "316",
          "party_name": "中國和平統一黨",
          "color_code": "FBE991"
        },
        {
          "party_code": "319",
          "party_name": "宗教聯盟",
          "color_code": "E4C175"
        },
        {
          "party_code": "321",
          "party_name": "台灣學習黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "324",
          "party_name": "世界大同黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "331",
          "party_name": "愛心黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "333",
          "party_name": "舊臺灣",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "338",
          "party_name": "左翼聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "339",
          "party_name": "中華愛國同心黨",
          "color_code": "02007B"
        },
        {
          "party_code": "341",
          "party_name": "國會政黨聯盟",
          "color_code": "4BBA7C"
        },
        {
          "party_code": "342",
          "party_name": "合一行動聯盟",
          "color_code": "E18080"
        },
        {
          "party_code": "346",
          "party_name": "安定力量",
          "color_code": "AB87D3"
        },
        {
          "party_code": "348",
          "party_name": "喜樂島聯盟",
          "color_code": "70BCC0"
        },
        {
          "party_code": "350",
          "party_name": "台灣民眾黨",
          "color_code": "80CED4"
        },
        {
          "party_code": "352",
          "party_name": "一邊一國行動黨",
          "color_code": "96D0E5"
        },
        {
          "party_code": "355",
          "party_name": "台澎黨",
          "color_code": "E3AD77"
        },
        {
          "party_code": "356",
          "party_name": "台灣維新",
          "color_code": "877DBA"
        },
        {
          "party_code": "998",
          "party_name": "連署",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "999",
          "party_name": "無黨籍與未經政黨推薦",
          "color_code": "9D9D9D"
        },
        {
          "party_code": "1000",
          "party_name": "其他",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10011",
          "party_name": "張亞中等150人聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10012",
          "party_name": "王廷興等20人聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10014",
          "party_name": "國家民主黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10047",
          "party_name": "中國台灣原住民黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10079",
          "party_name": "綠色本土清新黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10102",
          "party_name": "洪運忠義黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10133",
          "party_name": "台灣國民會議",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10134",
          "party_name": "制憲聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10135",
          "party_name": "紅黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10166",
          "party_name": "台灣主義黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10179",
          "party_name": "華聲黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10189",
          "party_name": "健保免費連線",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10195",
          "party_name": "中華民國臺灣基本法連線",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10199",
          "party_name": "人民民主陣線",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10254",
          "party_name": "中華民主向日葵憲政改革聯盟",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10278",
          "party_name": "泛盟黨",
          "color_code": "CDCDCD"
        },
        {
          "party_code": "10290",
          "party_name": "皇君人民政黨",
          "color_code": "CDCDCD"
        }
    ]

    const _keys = ["南投縣"]; 
    const _group = {
        "南投縣": [
            {
                "prv_code": "10",
                "city_code": "008",
                "area_code": "00",
                "dept_code": "000",
                "li_code": "0000",
                "tbox_no": "0000",
                "cand_no": 1,
                "ticket_num": 74854,
                "ticket_percent": 26.05,
                "is_victor": " ",
                "ris_prv_code": "10",
                "ris_city_code": "008",
                "ris_area_code": "00",
                "ris_dept_code": "000",
                "area_name": "南投縣",
                "cand_id": 203249,
                "cand_name": "柯文哲",
                "cand_sex": "1",
                "cand_birthyear": "1959",
                "cand_edu": "博士",
                "party_code": 350,
                "party_name": "台灣民眾黨",
                "is_current": "N",
                "is_vice": " "
            },
            {
                "prv_code": "10",
                "city_code": "008",
                "area_code": "00",
                "dept_code": "000",
                "li_code": "0000",
                "tbox_no": "0000",
                "cand_no": 1,
                "ticket_num": 74854,
                "ticket_percent": 26.05,
                "is_victor": " ",
                "ris_prv_code": "10",
                "ris_city_code": "008",
                "ris_area_code": "00",
                "ris_dept_code": "000",
                "area_name": "南投縣",
                "cand_id": 203250,
                "cand_name": "吳欣盈",
                "cand_sex": "2",
                "cand_birthyear": "1978",
                "cand_edu": "碩士",
                "party_code": 350,
                "party_name": "台灣民眾黨",
                "is_current": "N",
                "is_vice": "Y"
            },
            {
                "prv_code": "10",
                "city_code": "008",
                "area_code": "00",
                "dept_code": "000",
                "li_code": "0000",
                "tbox_no": "0000",
                "cand_no": 2,
                "ticket_num": 103279,
                "ticket_percent": 35.95,
                "is_victor": "*",
                "ris_prv_code": "10",
                "ris_city_code": "008",
                "ris_area_code": "00",
                "ris_dept_code": "000",
                "area_name": "南投縣",
                "cand_id": 203251,
                "cand_name": "賴清德",
                "cand_sex": "1",
                "cand_birthyear": "1959",
                "cand_edu": "碩士",
                "party_code": 16,
                "party_name": "民主進步黨",
                "is_current": "Y",
                "is_vice": " "
            },
            {
                "prv_code": "10",
                "city_code": "008",
                "area_code": "00",
                "dept_code": "000",
                "li_code": "0000",
                "tbox_no": "0000",
                "cand_no": 2,
                "ticket_num": 103279,
                "ticket_percent": 35.95,
                "is_victor": " ",
                "ris_prv_code": "10",
                "ris_city_code": "008",
                "ris_area_code": "00",
                "ris_dept_code": "000",
                "area_name": "南投縣",
                "cand_id": 203252,
                "cand_name": "蕭美琴",
                "cand_sex": "2",
                "cand_birthyear": "1971",
                "cand_edu": "碩士",
                "party_code": 16,
                "party_name": "民主進步黨",
                "is_current": "N",
                "is_vice": "Y"
            },
            {
                "prv_code": "10",
                "city_code": "008",
                "area_code": "00",
                "dept_code": "000",
                "li_code": "0000",
                "tbox_no": "0000",
                "cand_no": 3,
                "ticket_num": 109163,
                "ticket_percent": 38,
                "is_victor": " ",
                "ris_prv_code": "10",
                "ris_city_code": "008",
                "ris_area_code": "00",
                "ris_dept_code": "000",
                "area_name": "南投縣",
                "cand_id": 203253,
                "cand_name": "侯友宜",
                "cand_sex": "1",
                "cand_birthyear": "1957",
                "cand_edu": "博士",
                "party_code": 1,
                "party_name": "中國國民黨",
                "is_current": "N",
                "is_vice": " "
            },
            {
                "prv_code": "10",
                "city_code": "008",
                "area_code": "00",
                "dept_code": "000",
                "li_code": "0000",
                "tbox_no": "0000",
                "cand_no": 3,
                "ticket_num": 109163,
                "ticket_percent": 38,
                "is_victor": " ",
                "ris_prv_code": "10",
                "ris_city_code": "008",
                "ris_area_code": "00",
                "ris_dept_code": "000",
                "area_name": "南投縣",
                "cand_id": 203254,
                "cand_name": "趙少康",
                "cand_sex": "1",
                "cand_birthyear": "1950",
                "cand_edu": "碩士",
                "party_code": 1,
                "party_name": "中國國民黨",
                "is_current": "N",
                "is_vice": "Y"
            }
        ],
    };
    const _winnerList: TicketModel[] =  getTicketWinnerList(_keys, _group);
    
    const _combineList: tempList[] = combineWinnerAndColorList(_winnerList, OAColorTable);
    
    const mapList: MapViewModel[] = combineWinnerColorAndMapList(_combineList, cityPath);
    
    it('getTicketWinnerList returns the correct model', () => {
        const expected: TicketModel[] = 
        [
            {
                prv_code: '10',
                city_code: '008',
                area_code: '00',
                dept_code: '000',
                li_code: '0000',
                tbox_no: '0000',
                cand_no: 3,
                ticket_num: 109163,
                ticket_percent: 38,
                is_victor: ' ',
                ris_prv_code: '10',
                ris_city_code: '008',
                ris_area_code: '00',
                ris_dept_code: '000',
                area_name: '南投縣',
                cand_id: 203253,
                cand_name: '侯友宜',
                cand_sex: '1',
                cand_birthyear: '1957',
                cand_edu: '博士',
                party_code: 1,
                party_name: '中國國民黨',
                is_current: 'N',
                is_vice: ' '
              }
        ] as TicketModel[];
        expect(_winnerList).toMatchObject(expected);
    });

    it('combineWinnerAndColorList returns the correct model', () => {
        const expected: tempList[] = [
            {
                area_code: '00',
                area_name: '南投縣',
                cand_birthyear: '1957',
                cand_edu: '博士',
                cand_id: 203253,
                cand_name: '侯友宜',
                cand_no: 3,
                cand_sex: '1',
                city_code: '008',
                dept_code: '000',
                is_current: 'N',
                is_vice: ' ',
                is_victor: ' ',
                li_code: '0000',
                party_code: 1,
                party_color: '6B6BE4',
                party_name: '中國國民黨',
                prv_code: '10',
                ris_area_code: '00',
                ris_city_code: '008',
                ris_dept_code: '000',
                ris_prv_code: '10',
                tbox_no: '0000',
                ticket_num: 109163,
                ticket_percent: 38,
            }
        ];
        expect(_combineList).toMatchObject(expected);
    })

    it('combineWinnerColorAndMapList returns the correct model', () => {
        const expected: MapViewModel[] =  [
            {
                name: [ '南投縣' ],
                path: '\n        <g style="fill:#6B6BE4" id="Nantou">\n        ',
                party_color: '6B6BE4',
                prv_code: '10',
                city_code: '008',
                area_code: '00',
                dept_code: '000',
                li_code: '0000',
                tbox_no: '0000',
                cand_no: 3,
                ticket_num: 109163,
                ticket_percent: 38,
                is_victor: ' ',
                ris_prv_code: '10',
                ris_city_code: '008',
                ris_area_code: '00',
                ris_dept_code: '000',
                area_name: '南投縣',
                cand_id: 203253,
                cand_name: '侯友宜',
                cand_sex: '1',
                cand_birthyear: '1957',
                cand_edu: '博士',
                party_code: 1,
                party_name: '中國國民黨',
                is_current: 'N',
                is_vice: ' '
            }
        ];
        
        expect(mapList).toMatchObject(expected);
    })
});