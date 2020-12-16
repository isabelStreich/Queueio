package entite;
import java.security.PrivateKey;
public class User {
    private int idUser;
    private String role;
    private String nom;
    private int idCommerce;
    private String email;
    private String password;
    private String tel;
    public User() {
    }
    public User(int idUser, String role, String nom, int idCommerce, String email, String password, String tel) {
        this.idUser = idUser;
        this.role = role;
        this.nom = nom;
        this.idCommerce = idCommerce;
        this.email = email;
        this.password = password;
        this.tel = tel;
    }
    public int getIdUser() {
        return idUser;
    }
    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public int getIdCommerce() {
        return idCommerce;
    }
    public void setIdCommerce(int idCommerce) {
        this.idCommerce = idCommerce;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getTel() {
        return tel;
    }
    public void setTel(String tel) {
        this.tel = tel;
    }
}
