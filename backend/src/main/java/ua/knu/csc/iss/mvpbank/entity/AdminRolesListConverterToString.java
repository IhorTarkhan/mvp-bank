package ua.knu.csc.iss.mvpbank.entity;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;

@Converter
public class AdminRolesListConverterToString
    implements AttributeConverter<List<AdminRoles>, String> {
  private static final String DIVIDER = ", ";

  @Override
  public String convertToDatabaseColumn(List<AdminRoles> attribute) {
    if (attribute == null) {
      return "";
    }
    return attribute.stream().map(AdminRoles::toString).collect(Collectors.joining(DIVIDER));
  }

  @Override
  public List<AdminRoles> convertToEntityAttribute(String string) {
    if (string == null) {
      return emptyList();
    }
    return Arrays.stream(string.split(DIVIDER)).map(AdminRoles::valueOf).toList();
  }
}
