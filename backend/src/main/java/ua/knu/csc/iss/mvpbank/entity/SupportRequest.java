package ua.knu.csc.iss.mvpbank.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "support_request")
public class SupportRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "question")
  private String question;

  @Column(name = "is_closed")
  private boolean isClosed;

  @ManyToOne(targetEntity = Client.class)
  @JoinColumn
  private Client client;

  @ManyToOne(targetEntity = Admin.class)
  @JoinColumn
  private Admin admin;
}
