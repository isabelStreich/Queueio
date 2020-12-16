package entite;
import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.example.q_io.R;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
public class Queue {
    private int idQueue;
    public Queue(int idQueue) {
        this.idQueue = idQueue;
    }
    public int getIdQueue() {
        return idQueue;
    }
    public void setIdQueue(int idQueue) {
        this.idQueue = idQueue;
    }
}


