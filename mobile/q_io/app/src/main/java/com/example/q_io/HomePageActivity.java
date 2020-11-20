package com.example.q_io;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
public class HomePageActivity extends AppCompatActivity implements View.OnClickListener {
    Context ctx;
    private ImageView company_logo;
    private TextView company_name;
    private TextView total_queue;
    private TextView list_queue;
    private TextView chronometer;
    private TextView time;
    private TextView date;
    private Button confirm_btn;
    private Button invite_btn;
    private Button terminate_btn;
    private RequestQueue myQueue;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        ctx = this;
        company_logo = (ImageView) findViewById(R.id.company_logo_id);
        company_name = (TextView) findViewById(R.id.company_name_id);
        total_queue = (TextView) findViewById(R.id.total_queue_id);
        list_queue = (TextView) findViewById(R.id.list_queue_id);
        chronometer = (TextView) findViewById(R.id.chronometer_id);
        Button confirm_btn = (Button) findViewById(R.id.confirm_btn_id);
        Button invite_btn = (Button) findViewById(R.id.invite_btn_id);
        Button terminate_btn = (Button) findViewById(R.id.terminate_btn_id);
        //Définir la date actuelle
        Calendar calendar = Calendar.getInstance();
        String currentDate = DateFormat.getDateInstance(DateFormat.FULL).format(calendar.getTime());
        date = (TextView) findViewById(R.id.date_id);
        date.setText(currentDate);
        //Définir l'heure actuelle
        time = (TextView) findViewById(R.id.time_id);
        String currentTime = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());
        time.setText(currentTime);
        myQueue = Volley.newRequestQueue(this);
        invite_btn.setOnClickListener(v -> jsonParse());
        //Définir des boutons
        confirm_btn.setOnClickListener(this);
        invite_btn.setOnClickListener(this);
        terminate_btn.setOnClickListener(this);
    }
    //Appel API
    private void jsonParse() {
        String url = "https://???";
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> {
                    try {
                        JSONArray jsonArray = response.getJSONArray("queues");
                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject queue = jsonArray.getJSONObject(i);
                            int totalInQueue = queue.getInt("totalInQueue");
                            int nextNumberInQueue = queue.getInt("nextNumberInQueue");
                            total_queue.append(totalInQueue + ", " + String.valueOf(nextNumberInQueue) + "\n\n");
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }, error -> error.printStackTrace());
        myQueue.add(request);
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
        }
    }
    public void confirmPresence() {
        Toast.makeText(this, "Présence du client confirmée", Toast.LENGTH_SHORT).show();
    }
    public void inviteClient() {
        Toast.makeText(this, "Un client suivent invité", Toast.LENGTH_SHORT).show();
    }
    public void terminateService() {
        Toast.makeText(this, "Service actuel terminé", Toast.LENGTH_SHORT).show();
    }
}