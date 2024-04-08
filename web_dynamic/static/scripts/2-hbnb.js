$(function () {
  const amenitiesChecked = {};

  // Listen for changes on each input checkbox tag
  $('.amenities input:checkbox').change(function (event) {
    if ($(this).is(':checked')) {
      // store the Amenity ID in the list
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
      updateCheckedAmenitiesInterface();
    } else {
      // remove the Amenity ID from the list
      delete amenitiesChecked[$(this).data('id')];
      updateCheckedAmenitiesInterface();
    }
  });

  // update the h4 tag inside div Amenities with list of Amenities checked
  const updateCheckedAmenitiesInterface = () => {
    const length = Object.keys(amenitiesChecked).length;
    let content = ''; let i = 0;

    for (const amenity of Object.values(amenitiesChecked)) {
      const last = i === length - 1;
      content += amenity;
      if (!last) {
        content += ', ';
      }
      i++;
    }

    $('.amenities h4').text(content);
  };

  $.get('http://127.0.0.1:5001/api/v1/status/',
    function (data, textStatus, jqXHR) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  );
});
