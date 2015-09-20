#
# Cookbook Name:: celerity_cookbook
# Recipe:: default
#
# Copyright (C) 2015 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#
%w{curl vim git}.each do |pkg|
  package pkg do
    action :install
  end
end

directory '/home/vagrant/dev' do
  recursive true
  owner 'vagrant'
  group 'vagrant'
  mode '0755'
  action :create
end

file "/home/vagrant/dev/gulpfile.js" do
  content ::File.open("/vagrant/gulpfile.js").read
  owner "vagrant"
  group "vagrant"
  mode 0755
  action :create
end

%w{index.html package.json webpack.config.js}.each do |filename|
  link "/home/vagrant/dev/#{filename}" do
    to "/vagrant/#{filename}"
    owner "vagrant"
    group "vagrant"
    mode 0755
  end
end

include_recipe "nodejs::npm"
%w{gulp}.each do |pkg|
  nodejs_npm pkg
end
nodejs_npm "install" do
  path "/home/vagrant/dev"
  json true
  user "vagrant"
end

include_recipe "runit"
runit_service "gulp-webserver" do
  default_logger true
  owner "vagrant"
  group "vagrant"
end
