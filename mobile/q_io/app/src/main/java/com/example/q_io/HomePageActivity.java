package com.example.q_io;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
public class HomePageActivity extends AppCompatActivity {
    Context ctx;
    private ImageView company_logo;
    private TextView company_name;
    private TextView total_queue;
    private TextView list_queue;
    private TextView chronometer;
    private TextView clock;
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
        clock = (TextView) findViewById(R.id.clock_id);
        date = (TextView) findViewById(R.id.date_id);
        confirm_btn = (Button) findViewById(R.id.confirm_btn_id);
        invite_btn = (Button) findViewById(R.id.invite_btn_id);
        terminate_btn = (Button) findViewById(R.id.terminate_btn_id);
    }
}