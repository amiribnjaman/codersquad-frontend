"use client"

import Link from "next/link";
import React from "react";
export default function Footer() { 
    return (
        <div className="flex justify-between my-5">
            <p className="text-[14px]">
                <Link href="/dashboard" className="cursor-pointer text-[#2565e6]" >amartask</Link> - 
                2024. All right reserved</p>
            <ul className="flex gap-5 text-[13px]">
                <li>
                    <Link href="/dashboard" className="cursor-pointer">Terms & Conditions</Link>
                </li>
                <li><Link href="/dashboard">Privacy</Link></li>
                <li><Link href="/dashboard">Legal</Link></li>
            </ul>
        </div>
)

}