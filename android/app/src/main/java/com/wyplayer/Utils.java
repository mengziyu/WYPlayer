package com.wyplayer;

import android.app.ActivityManager;
import android.content.Context;
import android.database.Cursor;
import android.provider.MediaStore;
import android.util.Log;

import com.wyplayer.model.Music;

import java.util.ArrayList;
import java.util.List;

/**
 * 工具类
 */

public class Utils {

    /**
     * 扫描本地音乐
     *
     * @param mContext
     * @return 本地音乐列表
     */
    public static List<Music> queryLocalMusic(Context mContext) {
        Log.i("Utils --------> ","start scan local music");
        List<Music> list = new ArrayList<>();
        Cursor c = mContext.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null, null, null, null);
        if (c != null) {
            while (c.moveToNext()) {
                Music music = new Music();
                String musicName = c.getString(c.getColumnIndex(MediaStore.Audio.Media.TITLE));
                String musicSinger = c.getString(c.getColumnIndex(MediaStore.Audio.Media.ARTIST));
                String musicPath = c.getString(c.getColumnIndex(MediaStore.Audio.Media.DATA));

                music.setName(musicName);
                music.setSinger(musicSinger);
                music.setPath(musicPath);
                list.add(music);
            }

            Log.i("Utils --------> ","end scan,"+list.size()+" music");

        }
        return list;
    }


    /**
     * 用来判断服务是否运行
     * @param mContext
     * @param className 判断的服务名字
     * @return true 在运行 false 不在运行
     */
    public static boolean isServiceRunning(Context mContext,String className) {

        ActivityManager activityManager = (ActivityManager)
                mContext.getSystemService(Context.ACTIVITY_SERVICE);

        List<ActivityManager.RunningServiceInfo> serviceList = activityManager.getRunningServices(30);

        if(serviceList==null){
            return false;
        }

        if (serviceList.size()<0) {
            return false;
        }
        for(ActivityManager.RunningServiceInfo serviceInfo:serviceList){
            if(className.equals(serviceInfo.service.getClassName())){
                return true;
            }
        }
        return false;
    }
}
