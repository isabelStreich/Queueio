package com.example.q_io;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Queue;

import static android.content.ContentValues.TAG;
public class HttpQueueTask extends AsyncTask<String, Nullable, String> {
    private static final String TAG = "debugapp";
    Context context;
    TextView textViewTotalInQueue;
    View.OnClickListener listener;
    public HttpQueueTask(Context context, TextView textViewTotalInQueue) {
        this.context = context;
        this.textViewTotalInQueue = textViewTotalInQueue;
    }
    @Override
    protected String doInBackground(String... strings) {
        URL url = null;
        String json = "";
        try {
            url = new URL("https://queueio.com/employe_accueil");
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            json = in.readLine();
            urlConnection.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return json;
    }
    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        Log.d(TAG, "test: " + s);
        Queue[] queues = new Gson().fromJson(s, Queue[].class);
        for (Queue q : queues) {
            Button terminateServiceBtn = new Button(context);
//            terminateServiceBtn.setTag(""+q.getIdQueue());
            terminateServiceBtn.setOnClickListener(listener);
            terminateServiceBtn.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
            terminateServiceBtn.findViewById(R.id.terminate_btn_id);
        }
    }
    public void setListener(View.OnClickListener listener) {
        this.listener = listener;
    }
}

