package com.dianping.garden.view;

import com.dianping.cat.report.ReportPage;
import com.site.web.mvc.Page;

public class NavigationBar {
	public Page[] getVisiblePages() {
		return new Page[] {

		ReportPage.HOME,

		ReportPage.FAILURE,

		ReportPage.TRANSACTION

		};
	}
}
