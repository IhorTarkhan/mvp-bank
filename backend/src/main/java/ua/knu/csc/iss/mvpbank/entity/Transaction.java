package ua.knu.csc.iss.mvpbank.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "transaction")
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "amount", nullable = false)
  private BigDecimal amount;

  @ManyToOne(targetEntity = Client.class)
  @JoinColumn(name = "client_from_id", nullable = false)
  private Client clientFrom;

  @ManyToOne(targetEntity = Client.class)
  @JoinColumn(name = "client_to_id", nullable = false)
  private Client clientTo;

  @Column(name = "time")
  private LocalDateTime time;

  @Column(name = "accepted")
  private Boolean accepted;
}
