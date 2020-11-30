package com.example.q_io;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
public class HomePageActivity extends AppCompatActivity implements View.OnClickListener {
    Context ctx;
    private ImageView companyLogo;
    private TextView companyName;
    private TextView totalQueue;
    private TextView listQueue;
    private TextView currentNumber;
    private TextView chronometer;
    private TextView dateApp;
    private TextView timeApp;
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
//        companyLogo = (ImageView) findViewById(R.id.company_logo_id);
//        companyName = (TextView) findViewById(R.id.company_name_id);
//        totalQueue = (TextView) findViewById(R.id.total_queue_id);
//        currentNumber = (TextView) findViewById(R.current_number_id);
//        listQueue = (TextView) findViewById(R.id.list_queue_id);
        chronometer = (TextView) findViewById(R.id.chronometer_id);
        Button confirmBtn = (Button) findViewById(R.id.confirm_btn_id);
        Button inviteBtn = (Button) findViewById(R.id.invite_btn_id);
        Button terminateServiceBtn = (Button) findViewById(R.id.terminate_btn_id);
        Button deconnectionBtn = (Button) findViewById(R.id.deconnection_btn_id);
        //Définir la date actuelle
        Calendar calendar = Calendar.getInstance();
        String currentDate = DateFormat.getDateInstance(DateFormat.FULL).format(calendar.getTime());
        dateApp = (TextView) findViewById(R.id.date_app_id);
        dateApp.setText(currentDate);
        //Définir l'heure actuelle
        timeApp = (TextView) findViewById(R.id.time_app_id);
        String currentTime = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());
        timeApp.setText(currentTime);
//        myQueue = Volley.newRequestQueue(this);
//        inviteBtn.setOnClickListener(v -> jsonParse());
        //Définir des boutons
        confirmBtn.setOnClickListener(this);
        confirmBtn.setOnClickListener(v -> confirmPresence());
//        confirmBtn.cancel();
        //        inviteBtn.setOnClickListener(this);
        terminateServiceBtn.setOnClickListener(this);
        deconnectionBtn.setOnClickListener(this);
        inviteBtn.setOnClickListener(v -> {
            inviteBtn.setOnClickListener(v1 -> inviteClient());
            new CountDownTimer(30000, 1000) {
                public void onTick(long millisUntilFinished) {
                    chronometer.setText(millisUntilFinished / 1000 + "");
                    if (confirmBtn.isPressed() == true) {
                        cancel();
                        chronometer.setText("");
                    }
                }
                public void onFinish() {
                    chronometer.setText("Temps écoulé, passer donc au client suivent ?");
                }
            }.start();
        });
    }
    //Traitement des boutons
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.confirm_btn_id:
                confirmPresence();
                break;
            case R.id.invite_btn_id:
                inviteClient();
                break;
            case R.id.terminate_btn_id:
                terminateService();
                break;
            case R.id.deconnection_btn_id:
                try {
                    deconnection();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                break;
        }
    }
    public void confirmPresence() {
//        Toast.makeText(this, "Présence du client confirmée", Toast.LENGTH_SHORT).show();
        Toast.makeText(this, "Client servi", Toast.LENGTH_SHORT).show();
    }
    public void inviteClient() {
        Toast.makeText(this, "Un client suivent invité", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(ctx, RecyclerView.class);
        startActivity(intent);
    }
    //        if(inviteBtn.isPressed() == true){
//            inviteBtn.setOnClickListener(v ->
//            {
//                Intent intent = new Intent(ctx, MainActivity.class);
//                startActivity(intent);
//            });
//            chronometer--;
//            totalQueue--;
//        }
//        else{
//        Toast.makeText(this,"Il n'y a personne dans la file",Toast.LENGTH_SHORT).
//    show();
//        }
//}
    public void terminateService() {
        Toast.makeText(this, "Un service terminé", Toast.LENGTH_SHORT).show();
    }
    public void deconnection() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        close();
    }
    private void close() {
        Toast.makeText(this, "Déconnection", Toast.LENGTH_SHORT).show();
        if (deconnectionBtn.isPressed() == true) {
            this.close();
        }
    }
    //Call API
//    private void jsonParse() {
//        String url = "https://queueio.com/queue)";
//        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
//                response -> {
//                    try {
//                        JSONArray jsonArray = response.getJSONArray("queues");
//                        for (int i = 0; i < jsonArray.length(); i++) {
//                            JSONObject queue = jsonArray.getJSONObject(i);
//                            int totalInQueue = queue.getInt("totalInQueue");
//                            int nextNumberInQueue = queue.getInt("nextNumberInQueue");
//                            totalQueue.append(totalInQueue + ", " + String.valueOf(nextNumberInQueue) + "\n\n");
//                        }
//                    } catch (JSONException e) {
//                        e.printStackTrace();
//                    }
//                }, error -> error.printStackTrace());
//        myQueue.add(request);
//    }
}