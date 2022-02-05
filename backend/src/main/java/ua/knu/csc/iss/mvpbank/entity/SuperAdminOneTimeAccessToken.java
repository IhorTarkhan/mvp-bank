package ua.knu.csc.iss.mvpbank.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "super_admin_one_time_access_token")
public class SuperAdminOneTimeAccessToken {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;

  @Column(name = "token")
  private String token;

  @Column(name = "expires_at")
  private ZonedDateTime expiresAt;

  @ManyToOne(targetEntity = SuperAdmin.class, fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn
  private SuperAdmin superAdmin;
}
