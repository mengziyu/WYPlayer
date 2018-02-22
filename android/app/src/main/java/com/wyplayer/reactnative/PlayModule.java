package com.wyplayer.reactnative;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.wyplayer.OnPlayCompleteListener;
import com.wyplayer.PlayService;

/**
 * 播放模块
 */

public class PlayModule extends ReactContextBaseJavaModule{
    private static final String TAG="PlayModule";
    private Context mContext;
    private PlayService.PlayBinder mPlayBinder;
    private ServiceConnection mConnection=new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            Log.i(TAG,"service connect");
            mPlayBinder= (PlayService.PlayBinder) service;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            Log.i(TAG,"service disconnect");
        }
    };


    public PlayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext=reactContext;
    }

    @Override
    public String getName() {
        return "PlayModule";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @ReactMethod
    public void bindService(){
        Log.i(TAG,"enter bindService");
        mContext.bindService(
                new Intent(mContext,PlayService.class),
                mConnection,
                ReactApplicationContext.BIND_AUTO_CREATE);
    }

    @ReactMethod
    public void unbindService(){
        Log.i(TAG,"enter unbindService");
        if(mConnection!=null){
            mContext.unbindService(mConnection);
        }

        mPlayBinder.destroyMediaPlayer();

    }
    //扫描本地音乐
    @ReactMethod
    public void scanMusic(Callback callback){
        String json= JSON.toJSONString(mPlayBinder.scanMusic());
        callback.invoke(json);
    }

    @ReactMethod
    public void play(String source){
        mPlayBinder.play(source);
    }

    @ReactMethod
    public void pause(){
        mPlayBinder.pause();
    }

    @ReactMethod
    public void stop(){
        mPlayBinder.stop();
    }

    @ReactMethod
    public boolean isPlay(){
        return mPlayBinder.isPlaying();
    }

    @ReactMethod
    public void setPlayCompletCallback(final Callback callback){
        mPlayBinder.setListener(new OnPlayCompleteListener() {

            @Override
            public void onComplete() {
                callback.invoke();
            }
        });
    }
}
