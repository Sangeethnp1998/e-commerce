import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../../config/config';
import { VStack,Input, InputGroup, InputRightElement,Button, useToast ,FormControl,FormLabel  } from '@chakra-ui/react'
import { ViewIcon ,ViewOffIcon} from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [show,setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate();

    const submitHandler = async ()=>{
        if(!email ||  !password ){
            toast({
                    title: "Please fill all the fields.",
                    status:'warning',
                    duration: 5000,
                    isClosable :true,
                    position:'top'
                })
            setLoading(false)
            return
        }
        try {
            const body = {
                email,
                password
            }

            const { data } = await axios.post(`${config.apiUrl}user/login`,body);

            toast({
                    title: "Login Successful",
                    status:'success',
                    duration: 5000,
                    isClosable :true,
                    position:'top'
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
            setLoading(false);
            navigate('/products')
        } catch (error) {
            toast({
                title: "An Error Occured",
                description: error.response.data.message,
                status:'error',
                duration: 5000,
                isClosable :true,
                position:'top'
            })
            setLoading(false);
        }
    }
    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                        type={show ? 'text' :'password'}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <InputRightElement w='2.5rem'>
                        <Button h="1.5rem" size='xs' onClick={handleClick}>
                            {show ? <ViewOffIcon/> :<ViewIcon/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                width='100%'
                style={{marginTop:15}}
                onClick={submitHandler}
                isLoading= {loading}
            >
                Log In
            </Button>
            <Button
                variant= 'solid'
                colorScheme='red'
                width='100%'
                onClick={()=>{
                    setEmail("guest@example.com")
                    setPassword("123456")
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}
