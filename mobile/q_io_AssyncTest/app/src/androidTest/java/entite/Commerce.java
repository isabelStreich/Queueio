package entite;
public class Commerce {
    private int idCommerce;
    private String nomCompagnie;
    private String logo;
    public Commerce() {
    }
    public Commerce(int idCommerce, String nomCompagnie, String logo) {
        this.idCommerce = idCommerce;
        this.nomCompagnie = nomCompagnie;
        this.logo = logo;
    }
    public int getIdCommerce() {
        return idCommerce;
    }
    public void setIdCommerce(int idCommerce) {
        this.idCommerce = idCommerce;
    }
    public String getNomCompagnie() {
        return nomCompagnie;
    }
    public void setNomCompagnie(String nomCompagnie) {
        this.nomCompagnie = nomCompagnie;
    }
    public String getLogo() {
        return logo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
}
