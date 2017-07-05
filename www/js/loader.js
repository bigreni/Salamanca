var loadSIRI = function (e) {
    var i = $("#component-siri select[name=line-selector]"),
        n = $("#component-siri select[name=stop-selector]"),
        s = $("#component-siri .timetable"),
        a = $("#siri-selectors"),
        r = null,
        l = null,
        u = null,
        d = function (e) {
            e.find("option").remove().end().append('<option value="0">-- Seleccione una opción --</option>')
        },
        h = function () {
            s.find("tbody").empty()
        },
        c = function (e) {
            return Math.floor((new Date(e).getTime() - (new Date).getTime()) / 1e3 / 60)
        };
    s.hide(), a.hide(), d(i), $.ajax({
        url: "http://salamancadetransportes.com/siri?city=" + e,
        dataType: "json",
        success: function (e) {
            u = e, a.show(), $.each(e, function (e, t) {
                i.append($("<option>", {
                    value: t.id,
                    text: t.id + " - " + t.name
                }))
            })
        }
    }), i.change(function () {
        r = $(this).val(), d(n), s.hide(),
            line = u.find(function (e) {
                return e.id == r
            }), $.each(line.stops, function (e, t) {
                n.append($("<option>", {
                    value: t.id,
                    text: "(" + t.id + ") " + t.name
                })), n.prop("disabled", !1)
            })
    }), n.change(function () {
        l = $(this).val(), s.hide(), h(), $.ajax({
            url: "http://salamancadetransportes.com/siri",
            data: {
                city: e,
                stop: l
            },
            dataType: "json",
            success: function (e) {
                e = e.map(function (e) {
                    return e.time = c(e.time), e
                }), e.sort(function (e, t) {
                    return e.time < t.time ? -1 : e.time > t.time ? 1 : 0
                }), $.each(e, function (e, i) {
                    t = 0 == i.time ? "<<<" : i.time + " min";
                    var n = "<tr>";
                    n += ' <td><span>&nbsp;' + i.line + "</span></td>", n += " <td><span>" + i.direction + "</span></td>", n += ' <td><span>&nbsp;' + t + "</span></td>", n += "</tr>", s.find("tbody").append(n)
                }), s.show();
                $(".dropList").select2();
            }
        })
    })
};