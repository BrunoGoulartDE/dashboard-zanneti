const purifyCPFCNPJ = (value: string): string => {
  // Remove non-numeric characters, including dots and dashes
  value = value.replace(/\D/g, "");

  // Apply CPF mask (000.000.000-00)

  return value;
};

const formatCPFORCNPJ = (value: string): string => {
  //if it comes like 10645340405 it will be 106.453.404-05
  //if it comes like 07600827000185 it will be 07.600.827/0001-85

  // Remove non-numeric characters, including dots, dashes, and slashes
  if (value.length <= 14) {
    value = value.replace(/\D/g, "");
    if (value.length == 11) {
      return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (value.length == 14) {
      return value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
  }

  return value;
};

const formatBirthdateIntoInput = (value: string): string => {
  //transform 16-02-1997 into 1997-02-16
  const date = value.split("-");
  return date[2] + "-" + date[1] + "-" + date[0];
};

const formatMoney = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export {
  purifyCPFCNPJ,
  formatCPFORCNPJ,
  formatMoney,
  formatBirthdateIntoInput,
};
