import * as dotenv from 'dotenv'
dotenv.config()
const env={
    ACCESS_KEY_SECRET: process.env.ACCESS_KEY_SECRET || '7e1ad12fdf04513b83676adb06f0bba7cae319f4ec3b74d6ae2314b89e203f0bbefea541679bb5cc144600a5646c48ca2ec3f94f98d811f2983580f54fb5a03f',
    REFRESH_KEY_SECRET: process.env.REFRESH_KEY_SECRET || 'f65590d691e141cdc004a1ed361459a245f8ad11fe1f10b82e0cd32cf40ab3b38a5532fd44bbcbd485a783f52dace1da947ef59e16eceb6cf5b63634bce8e764'
}

export default env
