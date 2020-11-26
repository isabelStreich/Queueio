package com.example.q_io;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
public class HelperAdapter extends RecyclerView.Adapter<HelperAdapter.MyViewClass> {
    ArrayList<String> commerce;
    ArrayList<String> password;
    ArrayList<String> email;
    ArrayList<String> current_number;
    ArrayList<String> date;
    ArrayList<String> totalInQueue;
    Context context;
    public HelperAdapter(ArrayList<String> commerce, ArrayList<String> password, ArrayList<String> email, ArrayList<String> current_number, ArrayList<String> date, ArrayList<String> totalInQueue, Context context) {
        this.commerce = commerce;
        this.email = email;
        this.password = password;
        this.current_number = current_number;
        this.date = date;
        this.totalInQueue = totalInQueue;
        this.context = context;
    }
    @NonNull
    @Override
    public MyViewClass onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.result_layout, parent, false);
        MyViewClass myViewClass = new MyViewClass(view);
        return myViewClass;
    }
    @Override
    public void onBindViewHolder(@NonNull MyViewClass holder, int position) {
        holder.commerce.setText(commerce.get(position));
        holder.password.setText(password.get(position));
        holder.email.setText(email.get(position));
        holder.current_number.setText(current_number.get(position));
        holder.date.setText(date.get(position));
        holder.totalInQueue.setText(totalInQueue.get(position));
        holder.itemView.setOnClickListener(v -> Toast.makeText(context, "Sélectionné", Toast.LENGTH_LONG).show());
    }
    @Override
    public int getItemCount() {
        return commerce.size();
    }
    public class MyViewClass extends RecyclerView.ViewHolder {
        TextView commerce;
        TextView password;
        TextView email;
        TextView current_number;
        TextView date;
        TextView totalInQueue;
        public MyViewClass(@NonNull View itemView) {
            super(itemView);
            commerce = (TextView) itemView.findViewById(R.id.commerce_id);
            password = (TextView) itemView.findViewById(R.id.password_id);
            email = (TextView) itemView.findViewById(R.id.email);
            current_number = (TextView) itemView.findViewById(R.id.current_number_id);
            date = (TextView) itemView.findViewById(R.id.date_id);
            totalInQueue = (TextView) itemView.findViewById(R.id.total_in_queue_id);
        }
    }
}

