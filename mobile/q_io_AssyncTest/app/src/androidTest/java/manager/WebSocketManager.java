package manager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.q_io.R;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;

import static androidx.test.internal.runner.junit4.statement.UiThreadStatement.runOnUiThread;
public class WebSocketManager extends AppCompatActivity {
    private Button inviteBtn;
    private TextView output;
    private OkHttpClient client;
    private final class EchoWebSocketListener extends WebSocketListener {
        private static final int NORMAL_CLOSURE_STATUS = 1000;
        @Override
        public void onOpen(WebSocket webSocket, Response response) {
            webSocket.send("Connexion!");
            webSocket.send("Test de connexion!");
            webSocket.send(ByteString.decodeHex("Test de connexion!"));
            webSocket.close(NORMAL_CLOSURE_STATUS, "Fin de connexion!");
        }
        @Override
        public void onMessage(WebSocket webSocket, String text) {
            try {
                output("Recevoir : " + text);
            } catch (Throwable throwable) {
                throwable.printStackTrace();
            }
        }
        @Override
        public void onMessage(WebSocket webSocket, ByteString bytes) {
            try {
                output("Recevoir des données : " + bytes.hex());
            } catch (Throwable throwable) {
                throwable.printStackTrace();
            }
        }
        @Override
        public void onClosing(WebSocket webSocket, int code, String reason) {
            webSocket.close(NORMAL_CLOSURE_STATUS, null);
            try {
                output("Fin : " + code + " / " + reason);
            } catch (Throwable throwable) {
                throwable.printStackTrace();
            }
        }
        @Override
        public void onFailure(WebSocket webSocket, Throwable t, Response response) {
            try {
                output("Erreur : " + t.getMessage());
            } catch (Throwable throwable) {
                throwable.printStackTrace();
            }
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        inviteBtn = (Button) inviteBtn.findViewById(R.id.invite_btn_id);
        output = (TextView) output.findViewById(R.id.output);
        client = new OkHttpClient();
        inviteBtn.setOnClickListener(view -> start());
    }
    private void start() {
        Request request = new Request.Builder().url("https://queueio.com/queue_invite").build();
        EchoWebSocketListener listener = new EchoWebSocketListener();
        WebSocket ws = client.newWebSocket(request, listener);
        client.dispatcher().executorService().shutdown();
    }
    private void output(final String txt) throws Throwable {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                output.setText(output.getText().toString() + "\n\n" + txt);
            }
        });
    }
}
