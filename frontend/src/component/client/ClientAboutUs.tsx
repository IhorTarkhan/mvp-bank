import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { useLocale } from "../../i18n/i18n";

export const ClientAboutUs = (): ReactElement => {
  const [local] = useLocale();

  return (
    <Box>
      <Typography variant={"h5"}>{local.homeScreen.aboutUs.title}</Typography>
      <br />
      <Typography>
        Я, курсова робота одного дуже файного студента. І імʼя цього студента,
        Тархан Іогор, студент третього курсу, группи ІПС-32.
      </Typography>
      <br />
      <Typography>
        Це симуляція роботи банківсього додатку. Для користування цим додатком
        ви маєта зареєструватися, або ж увійти якщо ви вже є зареєстрованими.
      </Typography>
      <br />
      <Typography>
        Як користувач, ви можете перевести кошти на рахунок іншого користувача,
        або якщо щось не зрозуміло - звернутися у підтримку, подавши заяву.
        Працівники нашого банку звʼяжуться з вами поштою, коли побачать нову
        заявку від вас.
      </Typography>
      <br />
      <Typography>
        Або ж, ви можете поволонтерити, і допомогти нашим адміністраторам. Для
        цього додайте до поточноъ лінки у вашому браузері{" "}
        <code>'/admin-login'</code>, увійдіть в адміністративну частину з{" "}
        <code>'super.admin@mail.com'</code> і <code>'password'</code>.
      </Typography>
      <br />
      <Typography>
        Ви можете створити собі адміністративного ткористувача, під яким можете
        увійти в адмін-частину, і за вдповідними рролями ви зможете бачити взі
        запити на підтримку від користувачів, або можете подивитись запити на
        транзакції, і дозволити ті які чекають підтвердження
      </Typography>
      <br />
      <Typography>
        Сподіваюсь ви заціните мою роботу, адже я старався ;)
      </Typography>
    </Box>
  );
};
