import React, { useState } from 'react';
import {
    FormInput,
    FormCheckbox,
  } from "shards-react";  
import Axios from 'axios';

// 컴포넌트 불러오기
import AuthTemplateBlock from "./../components/login/AuthTemplateBlock"
import Center from "./../components/common/Center"
import WhiteBox from "./../components/login/WhiteBox"
import StyledLogo from "./../components/login/StyledLogo"
import StyledInput1 from "./../components/login/StyledInput_1"
import StyledInput2 from "./../components/login/StyledInput_2"
import Button from "./../components/login/Button"

const Login = ({history}) => {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
    }

    const onPwdHandler = (e) => {
        setPwd(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        const body = {
            uid: id,
            password: pwd,
        };

        Axios.post('/login', body).then((res) => {
            //console.log(res.data.loginSuccess);

            if(res.data.loginSuccess){
                history.push("/blog-overview");
            }else{
                console.log(res.data.loginSuccess);
            }
            
            //history.push("/blog-overview");
        }).catch((err) => {
            console.log(err);
        });
    }
    
    return(
        <AuthTemplateBlock>
        <WhiteBox>
                <Center>
                <StyledLogo>
                    <div className="d-table m-auto">
                    <img
                    id="main-logo"
                    className="d-inline-block align-top mr-1"
                    style={{ maxWidth: "150px" }}
                    src={require("../images/main_logo.png")}
                    alt="KJS94"
                    />
                    </div>
                </StyledLogo>
                </Center>
            <Center>  
                <StyledInput1>
                    <FormInput
                    id="id"
                    type="text"
                    placeholder="아이디"
                    onChange={onIdHandler}
                    />
                </StyledInput1>
            </Center> 
            <Center>
                <StyledInput1>
                    <FormInput
                    id="pwd"
                    type="password"
                    placeholder="비밀번호"
                    onChange={onPwdHandler}
                    />
                </StyledInput1>
            </Center>
            <Center>
            <StyledInput2>
                <FormCheckbox>아이디 저장</FormCheckbox>
            </StyledInput2> 
            </Center>   
            <Center>
                <form
                    onSubmit={onSubmitHandler}>
                    <Button primary className="btn btn-primary" type="submit">
                    로그인
                    </Button>
                </form>
            </Center>
        </WhiteBox>  
        </AuthTemplateBlock>
    )
};

export default Login;