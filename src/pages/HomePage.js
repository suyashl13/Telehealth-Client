/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import IndicateError from '../components/IndicateError';
import { loginContext } from '../contexts/LoginContext'
import { baseURL } from '../env';
import Home from './operational_pages/Home';

export default function HomePage() {

    const loginCtx = useContext(loginContext);
    const [isServerDown, setIsServerDown] = useState(false)

    const checkAuthentication = async () => {

        if (localStorage.getItem('authtoken') === null) {
            loginCtx.setIsLoggedIn(false)
            return 1;
        }

        if (localStorage.getItem('authtoken') === undefined) {
            loginCtx.setIsLoggedIn(false)
            return 1;
        } else {
            const check = axios.create({
                baseURL: baseURL,
                headers: {
                    'Uid' :  localStorage.getItem('id'),
                    'Authtoken' : localStorage.getItem('authtoken')
                }
            })
            await check.get('users/check_auth/').then(
                e => {
                    if (!e.data.Auth) {
                        localStorage.clear()
                        toast('Session Expired.', {type:'error', position:'bottom-center'})
                        loginCtx.setIsLoggedIn(false)
                    }
                }
            ).catch(
                e => {
                    setIsServerDown(true)
                }
            )
        }
    }

    useEffect(() => {
        checkAuthentication()
    }, [])

    if (isServerDown){ 
        return <IndicateError/>
    }
    if (!loginCtx.isLoggedIn) {
        return <Redirect to='/login' />
    } else { return  <Home /> }
}
