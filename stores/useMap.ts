import { TYPE } from "~/assets/js/enum";
import type { PartyColorModel, TicketGroupModel, TicketModel } from "~/models/data/ElectionModel";
import type { MapViewModel, tempList, TicketGeneratedModel } from "~/models/view/ViewModel";
import { getTicketData } from "~/services";

const storeName = 'map';
export const useMap = defineStore(storeName, () => {
    const overallStore = useOverall();
    const {
        OAId,
        OACode,
        OAColorTable
    } = storeToRefs(overallStore);

    const mapList: Ref<MapViewModel[]> = ref([]);

    const cityPath = [
        {
            name: ['臺北市'],
            path: `
            <g id="Taipei">
                <path d="M364.877 44.1781C362.915 41.8398 363.242 38.2766 365.531 36.3837L370.762 31.8184C373.051 29.8142 376.539 30.1482 378.392 32.4865L397.683 55.8697C399.645 58.208 399.318 61.7712 397.029 63.6641L391.798 68.2294C389.509 70.2337 386.021 69.8996 384.168 67.5613L364.877 44.1781Z" />
            </g>
            `
        },
        {
            name: ['新北市','臺北縣'],
            path: `
            <g id="New_Taipei">
                <path d="M323.483 43.3703C321.384 41.1538 321.716 37.9399 324.256 36.1667L374.402 1.14606C376.943 -0.627138 380.808 -0.294664 383.018 1.81101L403.783 21.2053C405.992 23.311 407.538 27.4115 407.207 30.5146L406.102 39.8239C405.771 42.8162 407.87 45.6976 410.962 46.2517L434.158 50.0198C437.14 50.4631 439.901 48.4682 440.343 45.3651L441.448 37.3858C441.889 34.3935 444.54 32.2878 447.302 32.7311C450.063 33.1744 453.819 35.6126 455.365 38.2724L461.55 48.2466C463.097 50.7956 462.544 54.4528 460.114 56.3368L450.063 64.2054C447.633 66.0894 443.767 69.1925 441.448 71.0765L393.4 109.754C391.081 111.638 387.436 111.417 385.337 109.2L323.483 43.3703ZM355.956 35.7234C353.637 37.7182 353.305 41.1538 355.294 43.4811L383.459 76.9502C385.448 79.2775 388.872 79.61 391.191 77.6151L406.655 64.5378C408.974 62.543 409.306 59.1074 407.317 56.7801L379.262 23.311C377.274 20.9837 373.85 20.6512 371.53 22.6461L355.956 35.7234Z" />
            </g>
            `
        },
        {
            name: ['桃園市', '桃園縣'],
            path: `
            <g id="Taoyuan">
                <path d="M280.94 74.2133C278.716 72.0992 278.938 68.8725 281.384 67.0922L309.624 46.2851C312.07 44.5048 315.85 44.8387 317.963 47.064L380.446 113.38C382.558 115.605 382.336 118.943 379.89 120.946L357.432 138.971C355.097 140.863 351.317 140.751 349.093 138.637L280.94 74.2133Z" />
            </g>
            `
        },
        {
            name: ['臺中市'],
            path: `
            <g id="Taichung">
                <path d="M173.033 258.66C169.933 258.66 168.715 256.442 170.265 253.891L206.132 191.444C207.682 188.782 211.335 186.675 214.435 186.675H346.943C350.043 186.675 354.693 187.895 357.239 189.448L360.117 191.111C362.774 192.664 364.213 196.214 363.327 199.208L360.228 209.635C359.342 212.518 356.242 215.735 353.364 216.622L224.176 256.997C221.298 257.884 216.427 258.66 213.328 258.66H173.033Z" />
            </g>
            `
        },
        {
            name: ['臺南市'],
            path: `
            <g id="Tainan">
                <path d="M126.285 486.818C123.2 486.818 120.666 484.423 120.556 481.375L118.353 421.496C118.243 418.557 120.666 416.053 123.641 416.053H228.954C232.039 416.053 232.7 417.795 230.606 419.863L166.824 483.008C164.731 485.076 160.434 486.818 157.46 486.818H126.285Z" />
            </g>
            `
        },
        {
            name: ['高雄市'],
            path: `
            <g id="Kaohsiung">
                <path d="M125.326 537.183C123.446 534.756 121.899 530.344 121.788 527.256L120.793 499.793C120.683 496.815 123.115 494.279 126.099 494.279H159.926C163.022 494.279 167.222 492.514 169.323 490.418L274.231 385.75C276.331 383.655 280.09 381.89 282.411 381.89C284.733 381.89 286.723 384.427 286.723 387.405V411.007C286.723 414.096 285.728 418.838 284.512 421.595L247.037 504.867C245.821 507.624 242.283 509.94 239.298 509.94H191.432C188.337 509.94 185.241 512.367 184.357 515.234L164.569 580.748C163.685 583.616 161.474 584.057 159.595 581.631L125.326 537.183Z" />
            </g>
            `
        },
        {
            name: ['新竹縣'],
            path: `
            <g id="Hsinchu_County">
                <path d="M278.153 139.634C275.304 138.643 273.989 135.56 275.304 132.808L282.098 117.943C283.413 115.191 282.208 111.888 279.468 110.456L264.016 102.639C261.276 101.317 260.29 98.0143 261.824 95.3718L270.372 80.3975C271.906 77.7549 274.865 77.3145 277.057 79.4065L345.002 143.928C347.194 146.02 348.947 150.204 348.947 153.177V158.242C348.947 161.325 346.646 162.976 343.797 161.985L278.153 139.634Z" />
            </g>
            `
        },
        {
            name: ['苗栗縣'],
            path: `
            <g id="Miaoli">
                <path d="M218.149 180.465C215.074 180.465 213.866 178.284 215.403 175.776L236.928 138.701C238.466 136.084 241.98 134.775 244.836 135.756L261.858 141.536C264.714 142.517 269.436 144.044 272.291 145.025L343.786 169.233C346.641 170.215 348.947 173.159 348.947 175.776C348.947 178.393 346.421 180.574 343.456 180.574H218.149V180.465Z" />
            </g>
            `
        },
        {
            name: ['彰化縣'],
            path: `
            <g id="Changhua">
                <path d="M147.375 303.696C144.307 303.696 143.102 301.534 144.636 299.049L161.289 270.628C162.822 268.034 166.438 265.981 169.505 265.981H210.479C213.547 265.981 215.957 268.466 215.957 271.384V298.401C215.957 301.426 213.437 303.804 210.479 303.804H147.375V303.696Z" />
            </g>
            `
        },
        {
            name: ['南投縣'],
            path: `
            <g id="Nantou">
                <path d="M282.845 374.569C279.733 374.569 275.066 373.469 272.399 372.039L226.947 348.717C224.28 347.287 222.057 343.656 222.057 340.686V270.279C222.057 267.199 224.391 264.009 227.392 263.128L351.079 224.735C353.968 223.855 355.635 225.505 354.857 228.365L319.74 346.407C318.851 349.267 316.184 353.227 313.85 355.098L293.18 371.159C290.735 373.029 286.29 374.569 283.29 374.569H282.845Z" />
            </g>
            `
        },
        {
            name: ['雲林縣'],
            path: `
            <g id="Yunlin">
                <path d="M123.011 345.177C119.909 345.177 118.691 342.973 120.242 340.438L134.532 315.863C136.083 313.218 139.739 311.124 142.841 311.124H210.418C213.52 311.124 215.957 313.659 215.957 316.634V339.777C215.957 342.863 213.409 345.287 210.418 345.287H123.011V345.177Z" />
            </g>
            `
        },
        {
            name: ['嘉義縣'],
            path: `
            <g id="Chiayi_County">
                <path d="M123.301 408.732C120.213 408.732 117.677 406.306 117.567 403.218L115.913 356.901C115.803 353.924 118.229 351.388 121.206 351.388H212.954C216.042 351.388 220.673 352.49 223.32 353.924L266.106 376.2C268.753 377.634 269.194 380.501 267.099 382.596L244.934 404.872C242.838 406.968 238.538 408.732 235.56 408.732H123.301ZM147.01 390.757C147.01 393.845 149.546 396.271 152.524 396.271H192.223C195.31 396.271 197.736 393.734 197.736 390.757V367.268C197.736 364.18 195.2 361.754 192.223 361.754H152.524C149.436 361.754 147.01 364.29 147.01 367.268V390.757Z" />
            </g>
            `
        },
        {
            name: ['屏東縣'],
            path: `
            <g id="Pingtung">
                <path d="M134.085 632.92C137.858 636.878 137.355 643.309 133.33 646.772L124.022 654.934C119.997 658.644 113.456 658.15 109.934 654.192C106.161 650.235 106.664 643.804 110.689 640.341L119.997 632.178C124.022 628.468 130.563 628.715 134.085 632.92Z" />
                <path d="M226.665 699.005C223.569 699.005 220.474 696.579 219.59 693.713L205.441 643.328C204.667 640.462 202.457 636.052 200.577 633.627L171.727 596.252C169.848 593.826 169.074 589.527 169.958 586.66L189.634 521.392C190.518 518.526 193.724 516.1 196.709 516.1H238.492C241.587 516.1 244.019 518.636 244.019 521.613V693.602C244.019 696.689 241.477 699.115 238.492 699.115H226.665V699.005Z" />
            </g>
            `
        },
        {
            name: ['宜蘭縣'],
            path: `
            <g id="Yilan">
                <path d="M510 81.1364C510 86.1693 505.946 90.2871 500.99 90.2871H489.728C484.772 90.2871 480.718 86.1693 480.718 81.1364C480.718 76.1035 484.772 71.9857 489.728 71.9857H500.99C505.946 71.9857 510 76.1035 510 81.1364Z" />
                <path d="M374.654 189.005C371.571 189.005 366.947 187.793 364.415 186.251L361.002 184.268C358.36 182.726 356.268 179.091 356.268 176.007V153.095C356.268 150.011 358.25 146.045 360.562 144.173L386.654 123.244C388.966 121.371 392.93 118.287 395.242 116.304L440.161 80.2841C442.473 78.4115 444.454 79.2927 444.564 82.377L445.335 136.792C445.335 139.766 444.674 144.723 443.794 147.587L432.784 183.828C431.903 186.691 428.711 189.115 425.628 189.115H374.654V189.005Z" />
            </g>
            `
        },
        {
            name: ['花蓮縣'],
            path: `
            <g id="Hualien">
                <path d="M297.492 417.941C294.935 416.288 292.823 412.433 292.823 409.459V385.337C292.823 382.253 294.824 378.288 297.159 376.415L319.061 359.343C321.507 357.47 324.175 353.615 324.953 350.641L369.202 201.722C370.092 198.859 373.316 196.435 376.318 196.435H424.124C427.237 196.435 428.905 198.859 428.015 201.722L352.414 447.13C351.525 449.993 348.746 451.095 346.077 449.443L297.492 417.941Z" />
            </g>
            `
        },
        {
            name: ['臺東縣'],
            path: `
            <g id="Taitung">
                <path d="M420.933 522.933C420.933 527.228 418.078 530.742 414.589 530.742H411.416C407.927 530.742 405.072 527.228 405.072 522.933V509.268C405.072 504.973 407.927 501.459 411.416 501.459H414.589C418.078 501.459 420.933 504.973 420.933 509.268V522.933Z" />
                <path d="M371.057 622.797C369.921 625.237 366.891 626.335 364.367 625.237L349.472 618.527C346.948 617.429 345.812 614.5 346.948 612.06L351.24 603.154C352.376 600.713 355.405 599.615 357.93 600.713L372.824 607.424C375.348 608.522 376.484 611.45 375.348 613.89L371.057 622.797Z" />
                <path d="M250.341 518.835C250.341 515.736 251.339 510.977 252.559 508.211L289.374 426.202C290.594 423.435 293.699 422.55 296.249 424.21L344.042 455.198C346.593 456.858 347.258 460.289 345.595 462.835L253.225 601.065C251.561 603.611 250.12 603.168 250.12 600.18V518.835H250.341Z" />
            </g>
            `
        },
        {
            name: ['澎湖縣'],
            path: `
            <g id="Penghu">
                <path d="M53.2565 445.308C54.3545 447.749 53.3785 450.677 50.9383 451.775L32.1488 460.682C29.7086 461.78 26.7804 460.804 25.6823 458.364L22.022 450.677C20.9239 448.237 21.9 445.309 24.3402 444.21L43.1297 435.304C45.5699 434.206 48.4981 435.182 49.5962 437.622L53.2565 445.308Z" />
                <path d="M14.5793 444.698C13.4812 447.139 10.553 448.237 8.1128 447.139L7.74677 447.017C5.30658 445.919 4.20849 442.99 5.30658 440.55L10.431 429.447C11.5291 427.007 14.4573 425.909 16.8975 427.007L17.2635 427.129C19.7037 428.227 20.8018 431.155 19.7037 433.596L14.5793 444.698Z" />
                <path d="M39.8351 425.055C41.2993 427.251 40.9332 430.179 38.8591 431.399C36.7849 432.62 34.1007 431.887 32.6366 429.569L29.9524 425.421C28.4882 423.225 28.8543 420.297 30.9284 419.076C32.8806 417.856 35.6868 418.588 37.1509 420.907L39.8351 425.055Z" />
            </g>
            `
        },
        {
            name: ['基隆市'],
            path: `
            <g id="Keelung">
                <path d="M418.358 41.0156C415.465 40.551 413.323 37.5314 413.644 34.2794L413.751 33.0019C414.073 29.8661 416.751 27.6594 419.644 28.124L429.714 29.75C432.606 30.2145 434.642 33.2342 434.321 36.37L434.106 37.7636C433.678 40.8994 431 43.1061 428.107 42.6416L418.358 41.0156Z" />
            </g>
            `
        },
        {
            name: ['新竹市'],
            path: `
            <g id="Hsinchu_City">
                <path d="M248.421 129.401C245.502 128.39 244.379 125.36 245.951 122.778L253.138 110.319C254.71 107.626 258.191 106.616 260.998 107.962L271.329 113.126C274.136 114.472 275.259 117.952 274.023 120.758L269.42 130.635C268.072 133.441 264.703 134.9 261.784 133.89L248.421 129.401Z" />
            </g>
            `
        },
        {
            name: ['嘉義市'],
            path: `
            <g id="Chiayi_City">
                <path d="M159.294 390.431C156.179 390.431 153.732 387.813 153.732 384.741V374.158C153.732 370.972 156.291 368.469 159.294 368.469H185.993C188.996 368.469 191.555 371.086 191.555 374.158V384.741C191.555 387.927 188.996 390.431 185.993 390.431H159.294Z" />
            </g>
            `
        },
        {
            name: ['金門縣'],
            path: `
            <g id="Kinmen">
                <path d="M32.9426 193.995C30.2584 193.995 28.0622 195.703 28.0622 197.9C28.0622 200.096 26.11 202.78 23.6699 203.878L21.4737 204.854C19.0335 205.952 17.0813 205.342 17.0813 203.512C17.0813 201.682 14.8852 200.096 12.201 200.096H4.88038C2.19617 200.096 0 202.292 0 204.976V224.498C0 227.182 2.19617 229.378 4.88038 229.378H12.201C14.8852 229.378 17.0813 227.182 17.0813 224.498V224.01C17.0813 221.325 19.0335 218.153 21.4737 217.055L23.6699 216.079C26.11 214.981 28.0622 216.201 28.0622 218.885V219.739C28.0622 222.423 30.2584 224.62 32.9426 224.62H40.2632C42.9474 224.62 45.1435 222.423 45.1435 219.739V198.998C45.1435 196.313 42.9474 194.117 40.2632 194.117H32.9426V193.995Z" />
            </g>
            `
        },
        {
            name: ['連江縣'],
            path: `
            <g id="Matsu">
                <path d="M173.254 53.6842C173.254 56.3684 171.057 58.5646 168.373 58.5646H159.833C157.148 58.5646 154.952 56.3684 154.952 53.6842C154.952 51 157.148 48.8038 159.833 48.8038H168.373C171.057 48.8038 173.254 51 173.254 53.6842Z" />
                <path d="M184.235 39.043C184.235 41.7273 182.038 43.9234 179.354 43.9234H168.373C165.689 43.9234 163.493 41.7273 163.493 39.043V37.8229C163.493 35.1387 165.689 32.9426 168.373 32.9426H179.354C182.038 32.9426 184.235 35.1387 184.235 37.8229V39.043Z" />
            </g>
            `
        }
    ];

    const test = () => {

        const _keys = ["南投縣", "嘉義市", "嘉義縣", "基隆市", "宜蘭縣"]; 
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
            "嘉義市": [
                {
                    "prv_code": "10",
                    "city_code": "020",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 39950,
                    "ticket_percent": 25.34,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "020",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義市",
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
                    "city_code": "020",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 39950,
                    "ticket_percent": 25.34,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "020",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義市",
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
                    "city_code": "020",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 68199,
                    "ticket_percent": 43.26,
                    "is_victor": "*",
                    "ris_prv_code": "10",
                    "ris_city_code": "020",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義市",
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
                    "city_code": "020",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 68199,
                    "ticket_percent": 43.26,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "020",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義市",
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
                    "city_code": "020",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 49507,
                    "ticket_percent": 31.4,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "020",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義市",
                    "cand_id": 203254,
                    "cand_name": "趙少康",
                    "cand_sex": "1",
                    "cand_birthyear": "1950",
                    "cand_edu": "碩士",
                    "party_code": 1,
                    "party_name": "中國國民黨",
                    "is_current": "N",
                    "is_vice": "Y"
                },
                {
                    "prv_code": "10",
                    "city_code": "020",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 49507,
                    "ticket_percent": 31.4,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "020",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義市",
                    "cand_id": 203253,
                    "cand_name": "侯友宜",
                    "cand_sex": "1",
                    "cand_birthyear": "1957",
                    "cand_edu": "博士",
                    "party_code": 1,
                    "party_name": "中國國民黨",
                    "is_current": "N",
                    "is_vice": " "
                }
            ],
            "嘉義縣": [
                {
                    "prv_code": "10",
                    "city_code": "010",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 67382,
                    "ticket_percent": 23.03,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "010",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義縣",
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
                    "city_code": "010",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 67382,
                    "ticket_percent": 23.03,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "010",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義縣",
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
                    "city_code": "010",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 139510,
                    "ticket_percent": 47.69,
                    "is_victor": "*",
                    "ris_prv_code": "10",
                    "ris_city_code": "010",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義縣",
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
                    "city_code": "010",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 139510,
                    "ticket_percent": 47.69,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "010",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義縣",
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
                    "city_code": "010",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 85642,
                    "ticket_percent": 29.28,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "010",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義縣",
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
                    "city_code": "010",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 85642,
                    "ticket_percent": 29.28,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "010",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "嘉義縣",
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
            "基隆市": [
                {
                    "prv_code": "10",
                    "city_code": "017",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 58195,
                    "ticket_percent": 26.6,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "017",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "基隆市",
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
                    "city_code": "017",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 58195,
                    "ticket_percent": 26.6,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "017",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "基隆市",
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
                    "city_code": "017",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 76079,
                    "ticket_percent": 34.77,
                    "is_victor": "*",
                    "ris_prv_code": "10",
                    "ris_city_code": "017",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "基隆市",
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
                    "city_code": "017",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 76079,
                    "ticket_percent": 34.77,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "017",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "基隆市",
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
                    "city_code": "017",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 84507,
                    "ticket_percent": 38.63,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "017",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "基隆市",
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
                    "city_code": "017",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 84507,
                    "ticket_percent": 38.63,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "017",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "基隆市",
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
            "宜蘭縣": [
                {
                    "prv_code": "10",
                    "city_code": "002",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 70171,
                    "ticket_percent": 26.27,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "002",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "宜蘭縣",
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
                    "city_code": "002",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 1,
                    "ticket_num": 70171,
                    "ticket_percent": 26.27,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "002",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "宜蘭縣",
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
                    "city_code": "002",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 119517,
                    "ticket_percent": 44.74,
                    "is_victor": "*",
                    "ris_prv_code": "10",
                    "ris_city_code": "002",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "宜蘭縣",
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
                    "city_code": "002",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 2,
                    "ticket_num": 119517,
                    "ticket_percent": 44.74,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "002",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "宜蘭縣",
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
                    "city_code": "002",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 77441,
                    "ticket_percent": 28.99,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "002",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "宜蘭縣",
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
                    "city_code": "002",
                    "area_code": "00",
                    "dept_code": "000",
                    "li_code": "0000",
                    "tbox_no": "0000",
                    "cand_no": 3,
                    "ticket_num": 77441,
                    "ticket_percent": 28.99,
                    "is_victor": " ",
                    "ris_prv_code": "10",
                    "ris_city_code": "002",
                    "ris_area_code": "00",
                    "ris_dept_code": "000",
                    "area_name": "宜蘭縣",
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
            ]       
        };
        const _winnerList: TicketModel[] =  getTicketWinnerList(_keys, _group);
        const _combineList: tempList[] = combineWinnerAndColorList(_winnerList, OAColorTable.value);
        const mapList: MapViewModel[] = combineWinnerColorAndMapList(_combineList, cityPath );
    }
    const getMapTicketList = async() => {
        const res = await getTicketData({id: OAId.value, type: TYPE.CITY, code: OACode.value});
        const _result: TicketModel[] = res.data[OACode.value];
        const _group: TicketGroupModel = groupBy(_result, 'area_name');
        const _keys: string[] = Object.keys(_group);
        
        // get the list of the winner of each city
        const _winnerList: TicketModel[] = getTicketWinnerList(_keys, _group);
        
        // generate the list of the winner party color of each city...
        const _combineList: tempList[] = combineWinnerAndColorList(_winnerList, OAColorTable.value);
        
        // generate the mapList 
        mapList.value = combineWinnerColorAndMapList(_combineList, cityPath);
        
        test()
    };
    

    return {
        mapList,
        getMapTicketList
    }
});