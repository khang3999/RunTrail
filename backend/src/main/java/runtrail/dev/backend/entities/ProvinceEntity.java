package runtrail.dev.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "provinces")
public class ProvinceEntity {

   @Id
   @Column(name = "code")
   private String code;

   @Column(name = "name")
   public String name;

   @Column(name = "name_en")
   private String nameEn;

   @Column(name = "full_name")
   private String fullName;

   @Column(name = "full_name_en")
   private String fullNameEn;

   @Column(name = "code_name")
   private String codeName;

   @Column(name = "administrative_unit_id")
   private int administrativeUnitId;

   @Column(name = "administrative_region_id")
   private int administrativeRegionId;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullNameEn() {
        return fullNameEn;
    }

    public void setFullNameEn(String fullNameEn) {
        this.fullNameEn = fullNameEn;
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    public int getAdministrativeUnitId() {
        return administrativeUnitId;
    }

    public void setAdministrativeUnitId(int administrativeUnitId) {
        this.administrativeUnitId = administrativeUnitId;
    }

    public int getAdministrativeRegionId() {
        return administrativeRegionId;
    }

    public void setAdministrativeRegionId(int administrativeRegionId) {
        this.administrativeRegionId = administrativeRegionId;
    }
}
