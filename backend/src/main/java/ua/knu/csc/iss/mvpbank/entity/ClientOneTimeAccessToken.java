package ua.knu.csc.iss.mvpbank.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "client_one_time_access_token")
public class ClientOneTimeAccessToken {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;

  @Column(name = "token")
  private String token;

  @ManyToOne(targetEntity = Client.class)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn
  private Client client;
}
