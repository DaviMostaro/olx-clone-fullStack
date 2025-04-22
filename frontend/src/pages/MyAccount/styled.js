import styled from 'styled-components';

export const PageArea = styled.div`

form {
    background-color:#FFF;
    border-radius:3px;
    padding:10px;
    box-shadow:0px 0px 3px #999;

    .area {
        display:flex;
        align-items:center;
        padding:10px;
        max-width:500px;

        .area--title {
            width:200px;
            text-align:right;
            padding-right:20px;
            font-weight:bold;
            font-size:14px;
        }

        .area--input {
            // flex:1;

            input {
                width:100%;
                font-size:14px;
                padding:5px;
                border:1px solid #DDD;
                border-radius:3px;
                outline:0;
                transition:all ease .4s;

                &:focus {
                    border-color:#333;
                    color:#333;
                }
            }

            button {
                background-color:#0089FF;
                border:0;
                outline:0;
                padding:5px 10px;
                border-radius:4px;
                cursor:pointer;
                color:#FFF;
                font-size:15px;
                transition:all ease .4s;

                &:hover {
                    background-color:#006FCE;
                }
            }

        }
    }

}

@media (max-width: 600px) {
    form {
        .area {
            flex-direction: column;
            align-items: flex-start;

            .area--title {
                width: 100%;
                text-align: left;
                padding-right: 0;
                margin-bottom: 10px;
            }

            .area--input {
                width: 100%;
            }
        }
    }
}

`;

export const AdsPageArea = styled.div`
    .list {
        display: flex;
        flex-wrap: wrap;

        .aditem {
            width: 25%;
            padding: 10px;
            position: relative;

            .editButton {
                display: none;
                position: absolute;
                top: 5px;
                right: 5px;
                background: rgba(0, 0, 255, 0.7);
                color: #fff;
                border: none;
                padding: 5px;
                cursor: pointer;
                border-radius: 5px;
            }

            &:hover .editButton {
                display: block;
            }
        }
    }

    @media (max-width: 600px) {
        .list {
            .aditem {
                width: 50%;

                .editButton {
                    display: block !important; // Adicionando !important para garantir que o botão seja exibido
                }
            }
        }
    }
`;