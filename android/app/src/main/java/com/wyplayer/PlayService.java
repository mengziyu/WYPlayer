package com.wyplayer;

import android.app.Service;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Binder;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.wyplayer.model.Music;

import java.io.IOException;
import java.util.List;

/**
 *音乐播放service
 */

public class PlayService extends Service {
    private static final String TAG="PlayService";

    private PlayBinder mPlayBinder;
    private MediaPlayer mMediaPlayer;


    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return mPlayBinder;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i(TAG,"onCreate");
        mPlayBinder=new PlayBinder();
        mMediaPlayer=new MediaPlayer();
        mMediaPlayer.setOnCompletionListener(mPlayBinder);
    }

    @Override
    public int onStartCommand(Intent intent,int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.i(TAG,"onDestroy");
        mPlayBinder.destroyMediaPlayer();
    }

    public class PlayBinder extends Binder implements MediaPlayer.OnCompletionListener{

        private OnPlayCompleteListener mListener;

        public void setListener(OnPlayCompleteListener listener) {
            mListener = listener;
        }
        //获取本地音乐
        public List<Music> scanMusic(){
            return Utils.queryLocalMusic(PlayService.this);
        }

        public void play(String source){
            try {
                mMediaPlayer.reset();
                mMediaPlayer.setDataSource(source);
                mMediaPlayer.prepare();
                mMediaPlayer.start();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        public void pause(){
            if(mMediaPlayer.isPlaying()){
                mMediaPlayer.pause();
            }else {
                mMediaPlayer.start();
            }
        }

        public void stop(){
            mMediaPlayer.stop();
        }

        public boolean isPlaying(){
            return mMediaPlayer.isPlaying();
        }

        public void destroyMediaPlayer(){
            if(mMediaPlayer!=null){
                mMediaPlayer.release();
            }
            Log.i(TAG,"destroy media player");
        }

        @Override
        public void onCompletion(MediaPlayer mp) {
            if(mListener!=null){
                mListener.onComplete();
            }
        }

    }
}
