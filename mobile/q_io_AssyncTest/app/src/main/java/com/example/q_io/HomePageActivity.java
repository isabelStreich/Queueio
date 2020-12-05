package com.example.q_io;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
public class HomePageActivity extends AppCompatActivity {
    TextView textViewTotalInQueue, textViewCurrentNumber;
    Context ctx;
    private ImageView companyLogo;
    private TextView companyName;
    private TextView chronometer;
    private TextView dateApp;
    private TextView timeApp;
    public TextView totalInQueue;
    public TextView currentNumber;
    private Button confirmBtn;
    private Button inviteBtn;
    private Button terminateServiceBtn;
    private Button deconnectionBtn;
    private RequestQueue myQueue;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        ctx = this;
        textViewTotalInQueue = (TextView) findViewById((R.id.total_queue_id));
        textViewCurrentNumber = (TextView) findViewById(R.id.current_number_id);
        companyLogo = (ImageView) findViewById(R.id.company_logo_id);
        companyName = (TextView) findViewById(R.id.company_name_id);
        totalInQueue = (TextView) findViewById(R.id.total_queue_id);
        currentNumber = (TextView) findViewById(R.id.current_number_id);
        chronometer = (TextView) findViewById(R.id.chronometer_id);
        Button confirmBtn = (Button) findViewById(R.id.confirm_btn_id);
        Button inviteBtn = (Button) findViewById(R.id.invite_btn_id);
        Button terminateServiceBtn = (Button) findViewById(R.id.terminate_btn_id);
        Button deconnectionBtn = (Button) findViewById(R.id.deconnection_btn_id);
        HttpQueueTask httpQueueTask = new HttpQueueTask(this, textViewTotalInQueue);
        httpQueueTask.setListener((View.OnClickListener) terminateServiceBtn);
        httpQueueTask.execute();
        HttpCurrentNumberTask httpCurrentNumberTask = null;
        try {
            httpCurrentNumberTask = new HttpCurrentNumberTask(this, textViewCurrentNumber);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        httpCurrentNumberTask.execute();
    }
}
class HttpCurrentNumberTask<currentTime, timeApp, currentDate, dateApp> extends AsyncTask<String, Nullable, String> {
    Context context;
    TextView textViewCurrentNumber;
    private TextView dateApp;
    private TextView timeApp;

    public HttpCurrentNumberTask(Context context, TextView textViewCurrentNumber) throws JSONException {
    this.context = context;
    this.textViewCurrentNumber = textViewCurrentNumber;
    }

    @Override
    protected String doInBackground(String... strings) {
        URL url = null;
        String json = "";
        try {
            if (strings != null && strings.length > 0) {
                url = new URL("https://queueio.com/queue_invite" + strings[0]);
            } else {
                url = new URL("https://queueio.com/queue_invite");
            }
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
//        super.onPostExecute(s);
//        Client[] clients = new Gson().fromJson(s, Client[].class);
//        if (textViewCurrentNumber.getChildCount() > 0) {
//            textViewCurrentNumber.removeTextChangedListener();
//        }
//        for (Client c : clients) {
//            textViewCurrentNumber.  addView(createSmallRecetteView(r.getImgName(), r.getTitre()));
//        }
    }

    //Définir la date actuelle
//    Calendar calendar = Calendar.getInstance();
//    String currentDate = DateFormat.getDateInstance(DateFormat.FULL).format(calendar.getTime());
//    dateApp = (TextView) findViewById(R.id.date_app_id);
//        dateApp.setText(currentDate);
//    //Définir l'heure actuelle
//    timeApp = (TextView) findViewById(R.id.time_app_id);
//    String currentTime = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());
//        timeApp.setText(currentTime);
    //Définir des boutons
//        terminateServiceBtn.setOnClickListener(this);
//        deconnectionBtn.setOnClickListener(this);
//        inviteBtn.setOnClickListener(v1->
//    {
//        new CountDownTimer(10000, 1000) {
//            public void onTick(long millisUntilFinished) {
//                chronometer.setText(millisUntilFinished / 1000 + "");
//                inviteBtn.setEnabled(false);
//                if (confirmBtn.isPressed() == true) {
//                    cancel();
//                    chronometer.setText("Client servi !");
//                }
//                inviteBtn.setText("Attendre le client ...");
//            }
//            public void onFinish() {
//                chronometer.setText("Temps écoulé, passer donc au client suivent ?");
//            }
//        }.start();
//        Toast.makeText(this, "Client invité", Toast.LENGTH_SHORT).show();
//    });
//}
//
//    private String JsonDataFromAsset() {
//        String json = null;
//        try {
//            InputStream inputStream = getAssets().open("queues.json");
//            int sizeOfFile = inputStream.available();
//            byte[] bufferData = new byte[sizeOfFile];
//            inputStream.read(bufferData);
//            inputStream.close();
//            json = new String(bufferData, "UTF-8");
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//        return json;
//    }
//    //Traitement des boutons
//    @Override
//    public void onClick(View v) {
//        switch (v.getId()) {
//            case R.id.confirm_btn_id:
//                break;
//            case R.id.terminate_btn_id:
//                try {
//                    terminateService();
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//                break;
//            case R.id.deconnection_btn_id:
//                deconnection();
//                break;
//        }
//    }
//    public void terminateService() throws InterruptedException {
//        Intent intent = new Intent(ctx, HomePageActivity.class);
//        startActivity(intent);
//        Thread.sleep(0);
//        Toast.makeText(this, "Si vous êtes pret", Toast.LENGTH_SHORT).show();
//        Toast.makeText(this, "Clicker \"INVITER CLIENT\"", Toast.LENGTH_SHORT).show();
//    }
//    public void deconnection() {
//        Intent intent = new Intent(ctx, MainActivity.class);
//        startActivity(intent);
//        Toast.makeText(this, "Vous êtes déconnecté", Toast.LENGTH_SHORT).show();
//    }

}
