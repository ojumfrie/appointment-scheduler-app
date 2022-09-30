export const services = {

    is_object_empty: (obj) => {
        let is_empty = true;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                is_empty = false;
                break;
            }
        }

        return is_empty;
    },

    convert_date_to_iso: (input_date, input_time) => {
        let temp_date = new Date(`${input_date} ${input_time}`);
        let timezone_offset_revert = (-(temp_date.getTimezoneOffset() / 60));
        let tempMilliseconds = temp_date.setTime(temp_date.getTime() + timezone_offset_revert * 60 * 60 * 1000);
        return new Date(tempMilliseconds).toISOString();
    },

    convert_date_to_iso_v2: (input_date_time) => {
        // console.log(input_date_time);
        // console.log(typeof input_date_time);
        let temp_date = new Date(input_date_time);
        let timezone_offset_revert = (-(temp_date.getTimezoneOffset() / 60));
        let tempMilliseconds = temp_date.setTime(temp_date.getTime() + timezone_offset_revert * 60 * 60 * 1000);
        return new Date(tempMilliseconds).toISOString();
    },

    validate_date_values: (state_obj) => {
        let temp_list = {};
        let is_empty = true;

        if (state_obj.start_date === '') temp_list.start_date = 'Start date is required.';
        if (state_obj.start_time === '') temp_list.start_time = 'Start time is required.';
        if (state_obj.end_date === '') temp_list.end_date = 'End date is required.';
        if (state_obj.end_time === '') temp_list.end_time = 'End time is required.';

        is_empty = services.is_object_empty(temp_list);

        if (is_empty) {
            let temp_start_date = (new Date(state_obj.start_date)).getTime();
            let temp_end_date = (new Date(state_obj.end_date)).getTime();

            let temp_start_time = (new Date(`${state_obj.start_date} ${state_obj.start_time}`)).getTime();
            let temp_end_time = (new Date(`${state_obj.start_date} ${state_obj.end_time}`)).getTime();

            if (temp_start_date > temp_end_date)
                temp_list.end_date = 'End date must be greater or equal to start date.';
            else {
                if (temp_start_date === temp_end_date) {
                    if (temp_end_time <= temp_start_time) temp_list.end_time = 'End time must be greater than start time.';
                }
            }
        }

        return temp_list;
    },

    validate_non_date_values: (obj) => {
        let temp_list = {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === '') {
                    let temp = key.toString().charAt(0).toUpperCase() + key.toString().slice(1);
                    temp_list[key] = `${temp} is required.`
                }
            }
        }

        return temp_list;
    },

    reformatDate: (date) => {
        let temp_date = new Date(date);
        // return `${temp_date.getFullYear()}-${("0" + (temp_date.getMonth() + 1)).slice(-2)}-${temp_date.getDate()} ${temp_date.getHours()}:${temp_date.getMinutes()}`;
        return `${temp_date.getFullYear()}-${("0" + (temp_date.getMonth() + 1)).slice(-2)}-${temp_date.getDate()} ${("0" + (temp_date.getHours() + 1)).slice(-2)}:${("0" + (temp_date.getMinutes() + 1)).slice(-2)}`;
    },

    split_into_date_and_time: (date) => {
        let temp_date = new Date(date);
        return {
            date: `${temp_date.getFullYear()}-${("0" + (temp_date.getMonth() + 1)).slice(-2)}-${temp_date.getDate()}`,
            time: `${temp_date.getHours()}:${temp_date.getMinutes()}`,
        }
    },
}

