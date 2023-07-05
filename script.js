const fetchData = async () => {
  const url = 'https://randomuser.me/api/?results=10';
  const response = await fetch(url);
  const parsedResponse = await response.json();

  return parsedResponse.results;
};

const parseData = (data) => {
  return data.map((el) => {
    return {
      picture: el.picture.thumbnail,
      title: el.name.title,
      firstName: el.name.first,
      lastName: el.name.last,
      age: el.dob.age,
      country: el.location.country
    };
  });
};

const addRemoveButton = (rowElement) => {
  const removeBtn = document.createElement('button');
  const colElement = document.createElement('td');

  removeBtn.innerText = 'Remove';
  removeBtn.addEventListener('click', (el) => el.target.closest('tr').remove());
  colElement.append(removeBtn);
  rowElement.append(colElement);
};

const fillRowWithData = (rowData, rowElement) => {
  rowData.forEach(([key, value]) => {
    const colElement = document.createElement('td');

    if (key === 'picture') {
      const img = document.createElement('img');
      img.src = value;
      colElement.append(img);
    } else {
      colElement.innerText = value;
    }
    rowElement.append(colElement);
  });
};

const createLayout = (dataArr) => {
  const table = document.getElementsByTagName('table')[0];

  dataArr.forEach(row => {
    const rowElement = document.createElement('tr');
    const rowData = Object.entries(row);

    fillRowWithData(rowData, rowElement);
    addRemoveButton(rowElement);
    table.append(rowElement);
  });
};

fetchData()
  .then(data => {
    const parsedData = parseData(data);
    createLayout(parsedData); // that's how I initially planned to implement it :)
  })
  .catch(err => {
    console.log(err);
  });


