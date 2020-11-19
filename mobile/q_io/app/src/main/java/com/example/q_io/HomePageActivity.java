package com.example.q_io;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
public class HomePageActivity extends AppCompatActivity {
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
        confirm_btn = (Button) findViewById(R.id.confirm_btn_id);
        invite_btn = (Button) findViewById(R.id.invite_btn_id);
        terminate_btn = (Button) findViewById(R.id.terminate_btn_id);
        //Définir la date actuelle
        Calendar calendar = Calendar.getInstance();
        String currentDate = DateFormat.getDateInstance(DateFormat.FULL).format(calendar.getTime());
        date = (TextView) findViewById(R.id.date_id);
        date.setText(currentDate);
        //Définir l'heure actuelle
        time = (TextView) findViewById(R.id.time_id);
        String currentTime = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());
        time.setText(currentTime);
    }
}