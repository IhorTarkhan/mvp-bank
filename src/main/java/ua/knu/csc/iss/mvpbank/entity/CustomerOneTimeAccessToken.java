package ua.knu.csc.iss.mvpbank.entity;

import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "customer_one_time_access_token")
public class CustomerOneTimeAccessToken {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;

  @Column(name = "token")
  private String token;

  @Column(name = "expires_at")
  private ZonedDateTime expiresAt;

  @ManyToOne(targetEntity = Customer.class, fetch = FetchType.LAZY)
  @JoinColumn
  private Customer customer;
}
