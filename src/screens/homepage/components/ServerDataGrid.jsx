import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { BsEmojiSunglassesFill } from 'react-icons/bs'


const ServerDataGrid = () => {

    const [userData, setData] = useState();

    const getUserData = async () => {
        await axios.get("http://localhost:8001/api/user")
            .then((res) => {
                setData(res.data)
            })
    }

    useEffect(() => {
        getUserData();
    }, [])






    console.log(userData)
    return (
        <div class="p-4">

            <div class=" w-full lg:w-6/12 xl:w-4/12 px-1  bg-slate-900">
                {/* <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
                </div> */}
                <div class="bg-slate-900 p-2 flex flex-col justify-between leading-normal shadow-lg">

                    <div class="flex-wrap w-full p-1 flow-root mt-1">
                        <p class="text-sm text-amber-600 flex items-center float-left mt-3">
                            <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Skylar's VIP status
                        </p>

                        <div class="text-sm flow-root mr-0">
                            <div className="text-white p-3 text-center inline-flex float-right items-center justify-end w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <BsEmojiSunglassesFill className="w-auto h-full" />
                            </div>
                        </div>


                    </div>

                    <div class="p-1">
                        <div class="font-bold text-xl mb-2 text-amber-500">Server Name: Public Casual</div>
                        <div class="text-amber-600 text-base">Role: VIP </div>
                    </div>

                    <div className="flex-wrap bg-slate-900 justify-center flow-root p-1">
                        <p className="text-base font-medium text-green-500 float-left"> Start Date: 12.7.12 </p>
                        <p className="ml-2 mr-2 text-xl"></p>
                        <p className="text-base font-medium text-red-500 float-right">End Date: 15.8.12</p><br />
                        <p className="text-base font-medium text-slate-400">Days Left: 42</p>
                    </div>
                    <div className="justify-end ml-auto mb-4"><br />
                        <button className="rounded-lg bg-slate-500 px-5 py-2 text-sm text-green-500 font-medium">RENEW</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ServerDataGrid

