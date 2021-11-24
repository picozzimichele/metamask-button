import React from 'react'

export default function ConnectButton({ setUserAccount }) {
    return (
        <div>
            <button onClick={() => setUserAccount()} className="flex px-5 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
                🦊
                <p className="ml-2">Metamask</p>
            </button>
        </div>
    )
}
